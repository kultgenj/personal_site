window.SITE_CONFIG = Object.freeze({
  // Exact hostname matching keeps previews and other domains out of production.
  amplitudeApiKey: ['jimkultgen.com', 'www.jimkultgen.com'].includes(window.location.hostname.toLowerCase())
    ? 'f38849850b3306f8879d9eae5f22b7f'
    : '7049357021ba326417ca0f4a0e2152be',
  replaySampleRate: 1,
  // Experiment client deployment keys (not Analytics API keys).
  experimentDeploymentKey: ['jimkultgen.com', 'www.jimkultgen.com'].includes(window.location.hostname.toLowerCase())
    ? '' // Production project: configure before enabling the flag.
    : '', // Testing project.
  experienceFlagKey: 'analytics-experience',
  autocapture: Object.freeze({
    attribution: true,
    pageViews: true,
    sessions: false,
    formInteractions: true,
    fileDownloads: true,
    elementInteractions: true,
    pageUrlEnrichment: true,
    frustrationInteractions: true,
    networkTracking: true,
    webVitals: true,
  }),
  fetchRemoteConfig: true,
});
