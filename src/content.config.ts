import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
	docs: defineCollection({
		loader: glob({
			pattern: "**/*.{md,mdx,typ}",
			base: "./src/content/docs"
		}),
		schema: docsSchema({
			extend: z.object({
				schema: z.union([z.any(), z.array(z.any())]).optional(),
			}),
		}),
	}),
};

