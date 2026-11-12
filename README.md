# Chem-E-Car UNSW — Photography-led website

A five-page React + Tailwind CSS + Framer Motion project using Vite.

## Run locally

```bash
npm install
npm run dev
```

To build static production assets:

```bash
npm run build
npm run preview
```

Deploy the `dist/` directory to a static host with SPA fallback to `index.html` so deep links such as `/team` resolve correctly.

## Edit content

- **All image paths:** `src/config/images.js`, exported as `CLUB_ASSETS`. All assigned files are local to `public/images/`; no stock-photo service is used.
- **Photos:** edit `heroes`, `showcase`, `outreach` and `about` in the image config. Existing filenames are bound exactly, including spaces and capitals. Partners/contact heroes, the campus exhibition, laboratory/workshop slots and individual portraits are intentionally unassigned.
- **Empty slots:** set a path to `null` to show a neutral photo placeholder. Broken image paths use the same fallback. Placeholders are visual frames; they do not upload files.
- **Team portraits:** add local paths to `CLUB_ASSETS.teamMembers` in the same order as the `members` roster in `src/main.jsx`. Use `null` for any missing portrait. An empty array leaves every portrait as a placeholder; group photos are not used as individual headshots.
- **People / team roles:** the `members` array in `src/main.jsx`. Names and role listings still need your confirmed roster.
- **Club email, Instagram, LinkedIn and recruitment URL:** `CLUB` in `src/main.jsx`. Update `CLUB.recruitment` if applications move.
- **Contact page layout:** `src/contact.css` controls the editorial contact rows and frosted recruitment panel. The rows stack on mobile.
- **Partners:** edit names and website links in `src/partners.js`. Their logo paths come from `CLUB_ASSETS.logos`; cards retain their square layout and hover/focus titles.
- **Partner logos:** UNSW uses the local official logo at `public/images/unsw-logo.png`. The other partner wordmarks in `public/images/partners/` are placeholders you can replace with official files.
- **Global footer:** `Footer` in `src/main.jsx` and `src/footer.css`. Both full-colour logos use the central image config; the club logo retains its multiply blending and large size.
- **Home outreach cards:** `src/events.css` controls equal card sizing, shared 16:10 photo/placeholder frames and aligned text. The three-column layout starts at 768px and stacks below that.
- **Image rendering and placeholder styles:** `src/components/AssetImage.jsx` and `src/images.css`.

### Add or replace a photo

1. Put the file in `public/images/` (subfolders are fine).
2. Set the relevant config entry to `/images/your-file.jpg` — omit `public` from the browser path.
3. Save while the development server is running to preview the change.

```js
// src/config/images.js
heroes: {
  home: '/images/HomeHero.jpeg',
  about: '/images/Team with Car in University.jpeg',
  team: '/images/Induction_Full Team.jpeg',
  partners: null, // Replace with a local path when ready.
  contact: null,
},
```

The Contact page provides a direct email link and links to Instagram, LinkedIn and the external recruitment form. It has no on-site enquiry form. Join links throughout the site point to `/contact#recruitment`.

## Release checklist

1. Fill any remaining photo placeholders with approved club images.
2. Add the confirmed team roster, individual portraits and LinkedIn URLs.
3. Replace remaining partner wordmarks with approved official logos.
4. Confirm contact details, social links and the recruitment destination.
5. Optimise local images and validate routes, mobile layouts and accessibility before publishing.
# Chem-E-Car-Website
