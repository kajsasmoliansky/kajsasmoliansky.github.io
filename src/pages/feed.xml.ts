import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		title: "Kajsa Smoliansky",
		description:
			"Projekt och uppdateringar från Kajsa Smolianskys arbete med traditionellt måleri och byggnadsvård",
		site: context.site!,
		items: sortedProjects.map((project) => ({
			title: project.data.title,
			description: project.data.description,
			pubDate: project.data.date,
			link: `/projects/${project.slug}/`,
		})),
	});
}
