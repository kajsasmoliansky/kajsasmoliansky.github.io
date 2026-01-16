import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
	const site = context.site!.toString();

	const feed = {
		version: "https://jsonfeed.org/version/1.1",
		title: "Kajsa Smoliansky",
		description:
			"Projekt och uppdateringar från Kajsa Smolianskys arbete med traditionellt måleri och byggnadsvård",
		home_page_url: site,
		feed_url: `${site}feed.json`,
		language: "sv",
		authors: [
			{
				name: "Kajsa Smoliansky",
			},
		],
		items: sortedProjects.map((project) => ({
			id: `${site}projects/${project.slug}/`,
			url: `${site}projects/${project.slug}/`,
			title: project.data.title,
			summary: project.data.description,
			date_published: project.data.date.toISOString(),
		})),
	};

	return new Response(JSON.stringify(feed, null, 2), {
		headers: {
			"Content-Type": "application/feed+json; charset=utf-8",
		},
	});
}
