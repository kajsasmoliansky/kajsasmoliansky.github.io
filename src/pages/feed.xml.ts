import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../consts";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		title: SITE.siteTitle,
		description: SITE.feedDescription,
		site: context.site!,
		items: sortedProjects.map((project) => ({
			title: project.data.title,
			description: project.data.description,
			pubDate: project.data.date,
			link: `/projects/${project.slug}/`,
		})),
	});
}
