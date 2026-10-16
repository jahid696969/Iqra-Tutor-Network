# Iqra Tutor Network — Landing Page

## Project Structure

```
iqra-tutor-network/
├── index.html   ← Main landing page (all sections)
├── style.css    ← All styles (mobile-first, responsive)
├── main.js      ← Behaviour + CONFIG object
└── logo.png     ← Brand logo
```

## Quick Setup

1. **Open `main.js`** and update the `CONFIG` object at the top:

```js
const CONFIG = {
  TUTOR_REGISTRATION_URL: 'https://docs.google.com/forms/...', // ✅ Already set
  WHATSAPP_NUMBER: '8801572929029',                            // ✅ Already set
  ABOUT_US_URL:       '#',     // ← Replace with your About page URL
  PRIVACY_POLICY_URL: '#',     // ← Replace with your Privacy Policy URL
  TERMS_URL:          '#',     // ← Replace with your Terms URL
  COMMISSION_POLICY_URL: '#commission', // ← Already points to page section
};
```

2. **Preview locally**: Simply open `index.html` in any modern browser.  
   No build tools or server needed — it's a static HTML page.

3. **Deploy**: Upload all 4 files to your web host as-is. No backend required.

## Sections Included

| Section | ID |
|---|---|
| Sticky Navigation | `#navbar` |
| Hero | `#hero` |
| Why Join? (Benefits) | `#benefits` |
| How It Works | `#how-it-works` |
| Who Can Register | `#who-can-register` |
| Preferred Teaching Areas | `#teaching-areas` |
| Subjects & Classes | `#subjects` |
| Commission Policy | `#commission` |
| Trust & Transparency | `#trust` |
| FAQ (Accordion) | `#faq` |
| Final CTA | `#register` |
| Footer | `#footer` |

## Adding Teaching Areas

In `index.html`, find the `<div class="areas-grid">` block and add/remove  
`<div class="area-tag">` entries — no code changes needed.

## Adding Verified Testimonials

Search for `<!-- Testimonials placeholder -->` in `index.html` to find  
the pre-prepared insertion point.

## Commission Disclosure

The 50% first-month commission is prominently displayed in:
- The dedicated Commission section (`#commission`)
- FAQ answer for Q3 and Q4
- Final CTA microcopy (links to commission section)

## Technical Notes

- No backend, database, or build step required.
- Google Form handles all data collection.
- WhatsApp contact: `https://wa.me/8801572929029`
- SEO: title, meta description, og: tags all set in `<head>`.
- Fonts: Hind Siliguri (Bangla) + Inter (English) via Google Fonts.
