import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
	loader: glob({
		pattern: "**/project.md",
		base: "./src/content/projects",
		generateId: ({ entry }) => entry.replace(/\/project\.md$/, ""),
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			order_by: z.number().int(),
			date: z.string().optional(),
			image: image().optional(),
		}),
});

const pages = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
	}),
});

export const collections = {
	projects,
	pages,
};
