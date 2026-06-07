# rohit.sonika.me

Personal academic website built with [Astro](https://astro.build).

## Project structure

```
src/
  content/
    thoughts/        ← blog posts (one .md file per post)
  layouts/
    Base.astro       ← shared sidebar + head (edit this to change nav or metadata)
  pages/
    index.astro      ← home page
    about.astro      ← about page
    research.astro   ← publications, working papers, grants
    cv.astro         ← abbreviated CV
    contact.astro    ← contact page
    thoughts/
      index.astro    ← list of all posts
      [slug].astro   ← individual post template (do not edit)
    rss.xml.js       ← RSS feed (auto-generated, do not edit)
  styles/
    global.css       ← all site styles
public/              ← static files (favicon, images, PDFs)
astro.config.mjs     ← site URL and Astro settings
```

## Publishing a new post

1. Create a new file in `src/content/thoughts/your-post-title.md`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: 2025-06-01
excerpt: "A one-sentence summary shown on the listing page."
---

Your post content here. You can use **bold**, *italic*, and [links](https://example.com).
```

3. Save, then push to GitHub:

```bash
git add .
git commit -m "Add new post: your post title"
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
