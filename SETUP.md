# Personal site refresh

Run `npm run build`, then `npm run preview`. Preview: http://127.0.0.1:4173.
No dependencies or CMS are required. The new site is generated in `dist/`.

Edit page layouts in `build-pages.cjs`, core biography copy in `copy-revised.txt`, styles in `site.css`, and browser behavior in `site.js`. Articles can be authored together later with custom interactive components. `articles.json` currently lists four LinkedIn articles as linked cards.

LinkedIn entries are direct links only; embedding has been removed. Store publication timestamps in `publishedAt` as ISO UTC timestamps. The build sorts newest first and displays dates in America/Chicago, accounting for daylight saving time.

For articles hosted here, add an entry with `type: "local"`, `title`, and `url: "articles/your-slug.html"`. Optional `description` appears in the card. Create that HTML file under the source `articles/` directory, using ../site.css and ../site.js for shared assets. The build validates its existence and copies it into dist/articles/. Local and LinkedIn entries appear together in JSON order, with clear source labels. No local article has been authored yet.

## Amplitude

`site-config.js` selects the original production browser key only for exact hostnames jimkultgen.com and www.jimkultgen.com. All other hostnames, including localhost and 127.0.0.1, use the testing key 7049357021ba326417ca0f4a0e2152be. Analytics starts automatically unless opted out; no query parameter is required. The selected key is used for Analytics, Guides & Surveys, and the Unified Script, including Web Experiment. Session Replay remains at 100% sampling. Autocapture sessions are disabled; the other listed autocapture options are explicitly enabled. The Privacy page has a persistent browser opt-out. Live ingestion, replay, and account entitlements have not been verified in this preview.

No site-defined custom events are sent. Autocapture and native Amplitude product events remain enabled.

Guides & Surveys is installed via the separate engagement script, registered before Analytics initializes. Web Experiment is included by the existing Unified Script, so no duplicate experiment tag is added. Actual guides, surveys, targeting, and web experiments must still be configured and published in Amplitude. The dedicated embedded survey page remains deferred. Feature Experiment/flags require a client deployment key and flag definitions. Account-side dashboards, activation, and AI features require separate configuration. This build does not claim to enable every Amplitude capability.

## Preservation and deployment

Original commit: 9ff1f68. Local restore tag: legacy-site-2026-09-17.
Development branch: personal-brand-refresh. Production is published to master. The original-site restore tag is also preserved on origin.
The original site is preserved by the restore tag. Production root HTML is replaced by the generated pages; R Markdown source, libraries, and CNAME are retained.
The superseded first draft is under ignored `.preview/initial-draft/`.

Verified hosting: GitHub Pages, master branch, repository root, custom domain jimkultgen.com, HTTPS enforced. Build with `npm run build`, copy dist contents to the repository root, commit, and push to master without force. The build includes CNAME and .nojekyll. Hosting settings and DNS are unchanged; DNS points to GitHub Pages.

For a restoration, build a reviewable commit restoring the deployment source to the tagged version and use the original host settings. Do not reset shared history or force-push. Inspect the original independently with `git worktree add ../personal_site-legacy legacy-site-2026-09-17`.

## Writing

See WRITING.md for the Unslop review and future article guidance. The downloaded tool is in the adjacent unslop repository; it is not a website runtime dependency.

## Experience feature flag

The About timeline is hidden in the initial HTML. Only an explicit `on` variant for `analytics-experience` reveals it. Missing configuration, opt-out, missing flags, and SDK failures leave it hidden. Copy is preserved in the builder.

Pending Amplitude setup: create `analytics-experience` in each project, keep it off, associate it with a client deployment, and put the matching client deployment keys into `site-config.js`. The Analytics API keys cannot replace these keys. No remote flag has been created or changed. Review the section before any production rollout.

Clean URLs: the builder emits about/index.html, articles/index.html, and privacy/index.html. Legacy .html pages redirect to their folder URLs. Internal navigation and shared assets use root-relative URLs. Restart preview.cjs after server changes.

MeasureCamp survey: /measurecamp-survey/ has the stable embedded-survey target #measurecamp-survey-target. The page is available by direct link and uses the shared Amplitude setup. Configure and publish the survey separately in the matching Amplitude project.

Survey results source: measurecamp-survey/results/ (standalone HTML plus photos). The builder copies the directory into dist at the same path. Edit this repository copy going forward; the original sibling ai-at-work-survey folder is retained as a draft. Results are a static snapshot, not a live API query.
