# QA & Acceptance

## Build quality
Before each milestone:
- TypeScript passes
- lint passes
- production build passes
- no console errors
- no broken links
- no secrets in source

## Responsive test matrix
320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560 CSS px.

Test:
- English
- Arabic RTL
- long Arabic labels
- long English labels
- mobile landscape
- browser zoom 200%

## Visual acceptance
Check:
- hero
- portrait cropping
- typography
- CTA placement
- navigation
- section rhythm
- footer
- no layout jumps
- no decorative content covering controls
- no horizontal scroll

## Consultation tests
### Requester type
- Patient / Consultation
- Physician / Referral

### Urgency
- Emergency
- Non-Emergency

Emergency:
- correct guidance
- no booking/payment
- no unnecessary continuation

Non-Emergency:
- Online Consultation
- Clinic Visit

### Form validation
- required fields
- email
- phone
- preferred time
- consent

### Attachments
- PDF accepted
- JPG accepted
- PNG accepted
- 4th file rejected
- invalid type rejected
- oversized file rejected
- upload failure handled

## Notifications
Test:
- staff notification arrives
- user WhatsApp confirmation arrives
- WhatsApp failure does not lose the request
- duplicate submissions are controlled
- webhook verification works where applicable

## Privacy/security
Verify:
- no sensitive data in logs
- no secrets in client bundle
- files are not public
- webhook signatures verified
- server-side validation active
- rate limiting/bot protection active
- debug output removed

## SEO QA
Every indexable page:
- title
- description
- canonical
- language
- Open Graph
- structured data where applicable

Site:
- sitemap
- robots.txt
- no accidental noindex
- correct canonicals
- correct hreflang
- no placeholder metadata
- no broken internal links

## Accessibility
Check:
- keyboard navigation
- visible focus
- semantic headings
- labels
- accessible errors
- contrast
- screen-reader-friendly form
- reduced motion
- touch target size
- language/dir switching

## Performance
Check on realistic mobile hardware:
- optimized images
- no unnecessary large JS
- no unnecessary third-party scripts
- stable layout
- good Core Web Vitals behavior
- no blocking visual effects

## Content QA
Confirm:
- biography facts approved
- exact professional titles
- no fabricated claims
- medical copy approved
- emergency wording approved
- Arabic copy reviewed
- French only where approved

## Launch acceptance
Only launch when:
- agreed pages exist
- consultation flow works end-to-end
- notifications tested
- official domain works
- SSL works
- SEO basics live
- analytics verified if approved
- responsive/mobile QA passes
- accessibility baseline passes
- legal pages approved
