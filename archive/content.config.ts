// src/content.config.ts  ← note: this file lives in src/, NOT src/content/
// Defines the schema for blog posts in the "thoughts" collection.
// Each .md file in src/content/thoughts/ must have these frontmatter fields.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { thoughts };
