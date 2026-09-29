# SEO, Discoverability & AI Search

## Objective
SEO is a core requirement.

Goal: build the strongest technically sound and authoritative digital presence possible for Dr. Mohamed Aggour's name, professional identity, expertise, relevant conditions and consultation service.

Do not promise a guaranteed first position.

## Search architecture
Each meaningful topic gets a crawlable URL. Target routes may include:
- `/`
- `/biography`
- `/conditions`
- `/conditions/brain-aneurysm`
- `/conditions/stroke`
- `/conditions/avm`
- `/conditions/carotid-stenosis`
- `/conditions/venous-sinus-disorders`
- `/conditions/chronic-subdural-haematoma`
- `/e-learning`
- `/remote-consultation`
- `/contact`
- `/legal`

There is no `/professional-activities` route: Professional Activities was
removed from the homepage, navigation, and sitemap (D-028, D-029).

Use a consistent locale strategy.

## Multilingual SEO
Launch baseline:
- English
- Arabic
- French architecture-ready; content depends on final approval

For translated pages:
- correct `lang`
- correct canonical
- `hreflang`
- discoverable locale versions
- no duplicate-content confusion
- predictable language switching

Reference:
https://developers.google.com/search/docs/specialty/international/localized-versions

## Metadata
Every indexable page:
- unique title
- useful description
- canonical
- Open Graph title/description/image
- language metadata
- appropriate robots rules

## Structured data
Use JSON-LD when the page genuinely qualifies.
Potential types:
- ProfilePage
- Person
- BreadcrumbList
- Article if Insights are later introduced

References:
https://developers.google.com/search/docs/appearance/structured-data
https://developers.google.com/search/docs/appearance/structured-data/profile-page

## Entity strategy
The official domain should clearly connect:
- Dr. Mohamed Aggour
- professional title
- professional organisations
- official profiles
- YouTube
- relevant social profiles
- publications / external professional records

Use consistent naming and justified `sameAs` links.

## Content quality
Condition pages should be concise but genuinely useful. Do not create thin pages with only a condition name and a CTA.

Do not fabricate credentials, outcomes or superiority claims.

## Biography as authority page
Biography should be the main professional authority page and organize approved facts clearly.

## Internal links
Create natural links between relevant pages, especially toward consultation.

## Technical discovery
Implement:
- XML sitemap
- robots.txt
- canonical URLs
- clean route hierarchy
- stable internal links
- optimized images
- correct response codes
- redirects where required

## Official domain
After the official domain is connected:
- use it as canonical
- redirect the Vercel hostname appropriately
- use it in metadata and sitemap
- configure Search Console for the official property

## Analytics and monitoring
Use, when approved:
- Google Search Console
- Bing Webmaster Tools
- GA4

Track meaningful events:
- consultation CTA click
- consultation started
- consultation submitted
- WhatsApp click
- YouTube click
- language change

## AI discoverability
Do not rely on fake AI SEO tricks.
Focus on:
- crawlability
- clear entity identity
- authoritative content
- valid structured data
- consistent external professional references
- strong internal linking
- people-first content

Reference:
https://developers.google.com/search/docs/appearance/ai-features

## SEO acceptance
Before launch:
- all critical pages indexable
- no accidental `noindex`
- canonical correct
- sitemap valid
- robots valid
- locale metadata valid
- structured data valid where used
- unique titles/descriptions
- no broken internal links
- no placeholder SEO copy
