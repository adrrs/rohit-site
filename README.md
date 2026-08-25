# rohit.sonika.me

Personal academic website built with [Astro](https://astro.build).

## Project structure

The site is currently a single page.

```
src/
  pages/
    index.astro       ← the entire site (nav, hero, research, publications, CV, contact)
  styles/
    simple.css        ← all site styles
netlify/
  edge-functions/
    bot-block.ts       ← blocks AI-scraper user agents, rate-limits by IP
public/                ← static files (robots.txt, favicon, etc.)
astro.config.mjs        ← site URL and Astro settings
archive/                ← previous multi-page/blog design, kept for reference (not built)
```

## Editing the site

Everything lives in `src/pages/index.astro` and `src/styles/simple.css`. Edit, then push to GitHub:

```bash
git add .
git commit -m "Update site"
git push
```

The site rebuilds on Netlify automatically within ~30 seconds.

## Local development

```bash
npm install     # first time only
npm run dev     # starts local server at http://localhost:4321
```

## Deployment

Hosted on Netlify. Every push to `main` triggers an automatic rebuild.

- Build command: `npm run build`
- Publish directory: `dist`
- Site URL: `https://rohit.sonika.me`
