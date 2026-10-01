# SEO Measurement & Search Console Pass 9

Status: **pre-launch plan**. No production domain, Search Console property, Bing Webmaster property, production traffic, or field performance dataset is configured in this repository. All measurement values remain unreported until collected from the live site.

## Current implementation audit

- `NEXT_PUBLIC_SITE_URL` is the centralized origin used by canonical/Open Graph metadata, JSON-LD, robots, and sitemap generation. It is unset in this checkout. The sitemap therefore returns an empty URL set and `robots.txt` omits its sitemap line; production launch requires the approved HTTPS origin to be configured.
- The sitemap is generated deterministically from `publicPathnames` for `en` and `ar` only: 13 page paths per locale, 26 intended indexable URLs. French routes are excluded. Existing SEO E2E tests verify this behavior when the test origin is set.
- The consultation journey is client-side prototype behavior: completing its preview does not submit a request, navigate, store browser state, or send a request. Existing E2E coverage verifies the preview behavior.
- No analytics package, analytics tag, webmaster verification token, or analytics event interface is implemented. No consent decision authorizes analytics. Do not add tracking until the owner approves its purpose, provider, data map, consent and legal handling.
- Keep Search Console/Bing verification credentials in their respective owner accounts/DNS configuration, never in public metadata or source control. Do not use the test origin to create production properties.

## Google Search Console readiness

**Recommended property:** after the final domain is approved, create a Domain property for the registrable domain and verify it with the DNS TXT record shown by Search Console. This covers protocols, subdomains, and paths; DNS control is required. Add the canonical HTTPS URL-prefix property only if operationally useful for a narrower report or verification workflow.

**Launch sequence:**

1. Configure `NEXT_PUBLIC_SITE_URL` to the final HTTPS canonical origin and deploy.
2. Confirm the selected host redirects consistently, and check representative `/en` and `/ar` pages, canonical tags, hreflang, robots, and `https://[FINAL_HOST]/sitemap.xml` from the public network.
3. Verify the Search Console property through DNS. Record owner access with the site owner; do not put verification secrets in code.
4. Submit the root sitemap URL in the Sitemaps report. Record submission date, fetch date, status, and discovered URL count. Submission is a discovery hint, not an indexing guarantee.
5. Use URL Inspection for a small representative set: English and Arabic home, Biography, Conditions index, one detail page per language, E-learning, Remote Consultation, Contact, and Legal. Check live availability, declared and selected canonical, crawl/index status, and rendered page. Inspect remaining condition URLs by exception or after sitemap processing.
6. Capture a Day 0 technical baseline: expected 26 launch URLs, sitemap processing, indexed/not-indexed reasons, manual actions/security issues, and any canonical or crawl anomalies. Do not infer indexing deadlines.
7. At Day 7, record initial coverage and processing status; at Day 14+, record early Search performance only if the report has data; at Day 30, establish the first comparative baseline. Note reporting lag and avoid conclusions from sparse data.

Google Search Console anonymizes some queries and aggregates data; report-level totals may not exactly equal sums of visible rows. Average position is an aggregate display metric, not a stable per-query rank. Separate page, query, country, device, search appearance, and date filters; record the selected filters and comparison windows with every export.

## Bing Webmaster readiness

After the final domain is live, add and verify the canonical site in Bing Webmaster Tools. Preferred simple path: import the verified Search Console site if the owner approves linking the accounts; otherwise use Bing's offered verification method, preferably DNS where available. Submit `https://[FINAL_HOST]/sitemap.xml` and check fetch/processing status and discovered URLs. Review crawl/index diagnostics and Search Performance after the service has collected data.

When the AI Performance report is available to the property, record its date window, cited URLs, citation counts, grounding-query samples, and any available topic/intent views. Bing describes this as aggregated citation activity; it is not a rank, authority, importance, or recommendation measure. A blank report is not proof of no AI citations.

## Search measurement framework

Use Search Console and Bing Webmaster query/page reports; do not create a keyword score or infer demand from empty data. Group observed queries into these reporting categories:

| Category | Scope | Page grouping | Locale comparison |
| --- | --- | --- | --- |
| Brand / person identity | Name and documented name variants observed in actual reports | Home, Biography | `/en` vs `/ar`; preserve platform spelling and Arabic query forms as observed |
| Specialty | Actual queries about documented specialty | Biography; Conditions index only where report intent supports it | Compare language-specific pages separately |
| Conditions | One group for each of the six approved condition pages | Matching condition detail; Conditions index as overview | Compare the corresponding EN/AR route pairs |
| Academic | Actual queries tied to documented publications/research | Biography | Preserve citation form; do not infer an author match from a short name alone |
| Consultation | Consultation/service intent visible in reports | Remote Consultation; Contact where appropriate | Compare language-specific routes |
| Physician education | Education/teaching intent | E-learning; Biography where relevant | Compare language-specific routes |
| Arabic / English | Language segmentation across all observed categories | Exact localized URL and matching pair | Keep Arabic and English query/page data separate before aggregate comparison |

Track impressions, clicks, CTR, and average position by query/page/date/country/device, with enough context to distinguish the selected report window. Investigate cannibalization when the same query group repeatedly shows multiple unrelated destination pages; first verify intent, canonical, and internal-link routing. Do not interpret a single URL switch as cannibalization. CTR changes should be compared among similar query/page/device/country groups and date periods; position is contextual and not a guarantee of outcome.

## Query → page reporting map

| Observed intent/category | Primary destination |
| --- | --- |
| Find Dr. Mohamed Aggour / professional identity | `/en` or `/ar`; Biography for background queries |
| Biography, career, qualifications, academic activity | `/[locale]/biography` |
| General condition overview | `/[locale]/conditions` |
| Brain Aneurysm | `/[locale]/conditions/brain-aneurysm` |
| Stroke | `/[locale]/conditions/stroke` |
| AVM | `/[locale]/conditions/avm` |
| Carotid Stenosis | `/[locale]/conditions/carotid-stenosis` |
| Venous Sinus Disorders | `/[locale]/conditions/venous-sinus-disorders` |
| Chronic Subdural Haematoma | `/[locale]/conditions/chronic-subdural-haematoma` |
| Physician education / teaching | `/[locale]/e-learning` |
| Remote consultation request | `/[locale]/remote-consultation` |
| Approved contact route | `/[locale]/contact` |
| Privacy/legal information | `/[locale]/legal` |

Use the actual Search Console/Bing query and landing-page evidence to evaluate assignments. Do not create query landing pages or alter medical content as part of measurement.

## Field Core Web Vitals plan

No production domain means there is no Search Console Core Web Vitals report, CrUX field dataset, or field LCP/INP/CLS baseline available now. Existing Playwright/browser measurements are lab-only and must not be reported as field performance.

After launch, use Search Console's Core Web Vitals report and PageSpeed Insights field data when available. Assess mobile and desktop separately, using the field 75th percentile and the reported rolling period/grouping. Review representative English and Arabic pages, especially Home, Biography, condition details, and Remote Consultation. Use Lighthouse/DevTools throttling for repeatable lab diagnosis, and label the device, browser, network/CPU profile, URL, and run date. Consider real-user monitoring only after explicit privacy/provider approval; do not collect consultation content or condition-specific visitor behavior.

Use the current Core Web Vitals “good” thresholds as recommended experience targets at the 75th percentile: LCP ≤ 2.5 seconds, INP ≤ 200 ms, CLS ≤ 0.1. The respective “poor” boundaries are LCP > 4 seconds, INP > 500 ms, CLS > 0.25. Treat these as field classification thresholds, not guaranteed rankings or a promise that every visit will meet them. Any automated operational alert should trigger investigation rather than an automatic code change.

## AI visibility observation

- Bing/Copilot: use Bing Webmaster AI Performance when available; save date range, report filters, cited pages, and sampled grounding queries. Describe it as an observed report, not a complete log of all generated answers.
- ChatGPT Search and Google AI search experiences: maintain a manual observation record only when a public answer and source citation are actually seen. Record date, platform/surface, exact observed query, locale/country context, cited URL, and evidence link/screenshot where permitted. Do not infer system-wide visibility from an observation or from absence of one.
- No AI visibility metrics exist before live-site reporting and actual observations.

## Analytics and privacy boundary

Analytics is **deferred**. No provider, cookie/consent implementation, or event collection is approved. Search Console and webmaster tools are the prelaunch measurement plan; do not add GA4, Clarity, pixels, tag managers, cookies, or a tracker.

If analytics is later approved, first document the purpose, legal/consent decision, data controller/vendor, retention, event schema, and privacy notice. A minimum event proposal may include generic consultation CTA click, flow start, preview completion, contact link click, language switch, and E-learning destination click. Do not include names, email/phone, free text, files, referral detail, specific condition route/topic, sensitive query string, or user-level profile/identifier in analytics. Avoid sending full page URLs where a consultation or condition path would disclose sensitive interest. Any approval must precede implementation.

## Regression monitoring and alert rules

These are operational review triggers, not ranking thresholds:

- **Immediate:** any intended public EN/AR route returns an unexpected 4xx/5xx, acquires `noindex`, loses/changes canonical, or is blocked by robots; sitemap returns invalid XML, an unexpected URL, or a fetch/processing error.
- **Coverage:** investigate a reported indexed-URL decrease of 20% or more against the established baseline, or loss of any known intended page. Check report lag, canonical selection, and page availability before concluding there is a fault.
- **Search performance:** after a usable 28-day baseline exists, review a 30% or larger change in clicks or impressions against the preceding comparable 28 days when the underlying count is sufficient to make percentages meaningful. Check seasonality, demand, device/country mix, and platform reporting before action. Do not auto-edit pages from a threshold alert.
- **Page groups:** review sustained visibility loss for one condition or one locale across comparable periods; inspect EN and AR separately for translation/canonical/hreflang regressions.
- **Bing AI:** record material citation trend changes as observations, not ranking movements.
- **Field CWV:** investigate new Search Console/PSI poor-URL groups or a material field regression; confirm with diagnostics and a lab reproduction.

During the first launch week, check deployment/availability, robots, sitemap processing, property security, and representative URL inspections daily. Once stable, review technical/search dashboards weekly. Prepare a monthly owner report. Do not maintain a daily manual routine indefinitely.

## Reporting dashboard model

Keep one dated report with: (1) technical health and sitemap, (2) Google clicks/impressions/CTR/position, (3) Bing Search Performance, (4) the six condition page groups, (5) identity/brand query group, (6) English vs Arabic, (7) country/device, (8) AI citations/observations, (9) field CWV, (10) consultation CTA aggregate only if approved, and (11) issues, evidence, owner, next action. Include source, date range, filters, and data limitations. Do not publish a composite ranking score.

## Post-domain launch checklist

- [ ] Final domain, canonical host, HTTPS, DNS access, and deployment owner approved.
- [ ] Set production `NEXT_PUBLIC_SITE_URL`; deploy and verify redirects, canonical, hreflang, EN/AR lang/dir, robots, sitemap, and 404s.
- [ ] Verify sitemap is valid XML and contains the 26 intended English/Arabic URLs only; French and utility/private URLs are absent.
- [ ] Create and verify the Search Console Domain property with the owner's DNS account; grant least-needed access to operators.
- [ ] Submit `/sitemap.xml`; record status, last read, and URL count.
- [ ] Inspect representative English and Arabic routes; record Google-selected canonical and index status.
- [ ] Create/import the Bing Webmaster property, verify it, submit the sitemap, and record processing status.
- [ ] Capture Day 0 technical baseline; record Day 7 coverage, Day 14+ early performance if available, and Day 30 comparison baseline.
- [ ] Check GSC security/manual actions, crawl/index issues, Page Indexing, Core Web Vitals, and Search Performance.
- [ ] Check Bing crawl/index/search reports and AI Performance availability; avoid treating missing report data as zero visibility.
- [ ] Confirm no analytics is active unless separately approved; if approved later, re-review privacy/legal/consent and run the event leakage tests.
- [ ] Save dated evidence and assign an owner to each issue; do not promise indexing or AI citation dates.

## Official platform references

- Google property types and Domain property verification: [Search Console Help](https://support.google.com/webmasters/answer/34592?hl=en)
- Google sitemap submission and limitations: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Google URL Inspection: [Search Console Help](https://support.google.com/webmasters/answer/9012289?hl=en)
- Google recrawl requests and no guarantee: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- Search Console query anonymization, aggregation, and reporting caveats: [Search Console Help](https://support.google.com/webmasters/answer/17011364?hl=en)
- Core Web Vitals thresholds and 75th-percentile method: [web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)
- Bing add/verify and Search Console import: [Bing Webmaster Tools](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- Bing sitemap management: [Bing Webmaster Tools](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- Bing AI Performance report scope and limitations: [Bing Webmaster Blog](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
