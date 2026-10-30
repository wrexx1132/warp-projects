# Warp Projects — 1.0 (beta)

Official website for **Warp Projects**, an independent studio publishing open-source projects.

**Live site:** https://huhhuhhhuhhuhhh.github.io/warp-projects/

## About

A static, single-page site with hash routing, eight languages, dark and light themes, a team directory, patch notes, a license page and a first-visit beta notice. No framework, no build step, no tracking.

## Structure

```
.
├── index.html                 # markup, meta tags, all page sections
├── .nojekyll                  # serve files as-is on GitHub Pages
└── assets/
    ├── css/
    │   └── style.css          # design system, layout, components, animations
    ├── js/
    │   ├── theme-init.js      # applies the saved theme/language before paint
    │   ├── app.js             # routing, i18n, team filters, theme, projects
    │   └── intro.js           # beta notice with "don't show again" memory
    └── img/
        └── favicon.svg        # white W mark
```

## Run locally

Any static server works:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Storage keys

| Key | Purpose |
| --- | --- |
| `warp.theme` | Saved theme (`dark` / `light`) |
| `warp.lang` | Saved language code |
| `warp.intro.dismissed` | Set to `1` when the beta notice is dismissed permanently |

Everything is stored locally in the browser. The site has no analytics and no backend.

## License

All Warp Projects projects are fully open source and must not be used for malicious purposes. No guarantee is provided for any page outside this site, including cases of misuse or modification.

© 2026 Warp Projects · All rights reserved.
