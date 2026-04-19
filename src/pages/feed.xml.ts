import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../consts";
import { getProjectPublishedDate, sortProjects } from "../utils/projects";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = sortProjects(projects);

	return rss({
		title: SITE.siteTitle,
		description: SITE.feedDescription,
		site: context.site!,
		items: sortedProjects.map((project) => ({
			title: project.data.title,
			description: project.data.description,
			pubDate: getProjectPublishedDate(project),
			link: `/projects/${project.id}/`,
		})),
	});
}
