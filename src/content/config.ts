import { defineCollection, z } from "astro:content";

const projects = defineCollection({
	type: "content",
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
