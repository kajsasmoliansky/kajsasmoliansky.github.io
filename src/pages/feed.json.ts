import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../consts";
import { getProjectPublishedDate, sortProjects } from "../utils/projects";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = sortProjects(projects);
	const site = context.site!.toString();

	const feed = {
		version: "https://jsonfeed.org/version/1.1",
		title: SITE.siteTitle,
		description: SITE.feedDescription,
		home_page_url: site,
		feed_url: `${site}feed.json`,
		language: SITE.lang,
		authors: [{ name: SITE.authorName }],
		items: sortedProjects.map((project) => ({
			id: `${site}projects/${project.id}/`,
			url: `${site}projects/${project.id}/`,
			title: project.data.title,
			summary: project.data.description,
			date_published: getProjectPublishedDate(project)?.toISOString(),
		})),
	};

	return new Response(JSON.stringify(feed, null, 2), {
		headers: {
			"Content-Type": "application/feed+json; charset=utf-8",
		},
	});
}
