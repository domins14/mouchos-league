import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Actualidad', 'Lesionados', 'Fichajes', 'Polémicas', 'Humor']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).default([]),
    featured: z.boolean().default(false),
    demo: z.boolean().default(true),
  }),
});

export const collections = { noticias };
