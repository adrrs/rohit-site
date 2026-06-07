// src/pages/rss.xml.js
// Generates the RSS feed at /rss.xml
// Updates automatically whenever you add a new post.

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('thoughts');
  const sorted = posts
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Rohit Sonika — Thoughts',
    description: 'Writing on research, methods, academia, and occasional non-finance topics.',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt ?? '',
      link: `/thoughts/${post.id}/`,
    })),
  });
}
