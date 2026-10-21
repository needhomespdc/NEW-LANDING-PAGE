# NeedHomes website (Next.js)

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Property Hub data
Properties come from your API on the **server** (`src/lib/api.js`), so the URL and key never reach the browser.
Set `PROPERTIES_API_URL` (and `PROPERTIES_API_KEY` if needed) in `.env.local` and in Vercel.

- The list endpoint must return `{ data: [...], meta: { totalPages } }`. Every page is fetched with `?page=N&limit=50`.
- Only records with `status: "published"` are shown. Pages refresh from the API every 60 seconds.
- `mapProperty()` in `src/lib/api.js` converts a record to what the site uses. Price on cards is `minInvestment`; the unit
  (slot, plot, unit) comes from the "left" label in `listingStats`; sold out means `inventoryAvailable` is 0;
  the home page slider shows `isHotSelling` properties that are still available.
- If `PROPERTIES_API_URL` is not set, sample properties are shown (local development only).
  If the API is unreachable in production, the Hub shows no properties rather than fake ones.

## Forms
Contact, Developer Partner, Data Deletion and Deactivation forms post to `/api/forms/<name>`, which forwards the JSON to the URL in
`FORM_ENDPOINT_CONTACT`, `FORM_ENDPOINT_PARTNER`, `FORM_ENDPOINT_DATA_DELETION`, `FORM_ENDPOINT_DEACTIVATION` or `FORM_ENDPOINT_WAITLIST`.
Your endpoint receives `{ form, ...fields, submittedAt, source }` and must answer with a 2xx status. Until a URL is set the form shows
"This form is not connected yet". Adding a form: add it to `src/lib/forms.js` and pass its key as `form` to the component.

## Waitlist modal
"Get Started" (nav) and every "Download App" button open a waitlist popup that collects an email and posts it to `FORM_ENDPOINT_WAITLIST`
with `trigger: "get-started"` or `"download-app"`. Add it to any button with `const openWaitlist = useWaitlist()` then `onClick={() => openWaitlist('my-source')}`.

## Google reviews
The home page hero shows live reviews from your Google Business Profile. Set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`
(Google Cloud: enable "Places API (New)" and billing; find the Place ID with Google's Place ID Finder). Refreshes daily.

## Deploy (GitHub, then Vercel)
Push to GitHub, import the repo in Vercel (it detects Next.js), add every variable from `.env.example` that you use, deploy.
Every push to `main` redeploys.

## Where things live
- `src/app/` routes and metadata (one `page.jsx` per URL)
- `src/views/` the page designs
- `src/components/` shared UI (nav, footer, hero, forms)
- `src/links.js` social and app store links; `src/nav.js` menu links
- `src/lib/seo.js` titles and descriptions per page
- Logo files: `public/images/logo-dark.svg` and `logo-light.svg`
