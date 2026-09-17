(() => {
  const config = window.SITE_CONFIG;
  let optedOut = false;
  try { optedOut = localStorage.getItem('jk-analytics-opt-out') === 'true'; } catch {}
  const allowed = !optedOut;
  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src; script.onload = resolve; script.onerror = reject;
    document.head.append(script);
  });
  const toggle = document.querySelector('#analytics-toggle');
  if (toggle) {
    toggle.textContent = optedOut ? 'Allow analytics' : 'Turn off analytics';
    const status = document.querySelector('#privacy-status');
    status.textContent = optedOut ? 'Analytics is turned off in this browser.' : 'Analytics is allowed for this site in this browser.';
    toggle.addEventListener('click', () => {
      try { localStorage.setItem('jk-analytics-opt-out', String(!optedOut)); location.reload(); }
      catch { status.textContent = 'This browser blocked preference storage. Please use your browser’s tracking controls.'; }
    });
  }
  async function initializeExperienceFlag() {
    const section = document.querySelector('#analytics-experience');
    if (!section || !config.experimentDeploymentKey) return;
    try {
      await load('https://cdn.amplitude.com/libs/experiment-js-client-1.23.1.global.min.js');
      const experiment = window.Experiment.initializeWithAmplitudeAnalytics(config.experimentDeploymentKey);
      // Discard cached assignments so an unsuccessful fetch cannot reveal the section.
      experiment.clear();
      await experiment.fetch();
      section.hidden = experiment.variant(config.experienceFlagKey, { value: 'off' }).value !== 'on';
    } catch {
      section.hidden = true;
      console.warn('Experience flag unavailable; section remains hidden.');
    }
  }
  async function initialize() {
    if (!allowed) return;
    try {
      await load(`https://cdn.amplitude.com/script/${config.amplitudeApiKey}.js`);
      // The Unified Script includes Web Experiment. Register Guides & Surveys
      // before Analytics initialization so it shares the correct identity.
      try {
        await load(`https://cdn.amplitude.com/script/${config.amplitudeApiKey}.engagement.js`);
        window.amplitude.add(window.engagement.plugin());
      } catch { console.warn('Guides & Surveys could not load.'); }
      if (window.sessionReplay?.plugin) window.amplitude.add(window.sessionReplay.plugin({ sampleRate: config.replaySampleRate }));
      await window.amplitude.init(config.amplitudeApiKey, { autocapture: config.autocapture, fetchRemoteConfig: config.fetchRemoteConfig }).promise;
      await initializeExperienceFlag();
    } catch { console.warn('Analytics unavailable. Site navigation remains available.'); }
  }
  initialize();
})();
