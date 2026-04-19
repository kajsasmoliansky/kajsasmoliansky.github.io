import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../consts";
import { getProjectPublishedDate, sortProjects } from "../utils/projects";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = sortProjects(projects);
	const site = context.site!;
	const feedUpdated = getProjectPublishedDate(sortedProjects[0]) ?? new Date();

	const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE.siteTitle}</title>
  <subtitle>${SITE.feedDescription}</subtitle>
  <link href="${site}atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${site}" rel="alternate" type="text/html"/>
  <id>${site}</id>
  <updated>${feedUpdated.toISOString()}</updated>
  <author>
    <name>${SITE.authorName}</name>
  </author>
${sortedProjects
	.map(
		(project) => {
			const publishedDate = getProjectPublishedDate(project) ?? feedUpdated;

			return `  <entry>
    <title>${escapeXml(project.data.title)}</title>
    <link href="${site}projects/${project.slug}/" rel="alternate" type="text/html"/>
    <id>${site}projects/${project.slug}/</id>
    <published>${publishedDate.toISOString()}</published>
    <updated>${publishedDate.toISOString()}</updated>
    ${project.data.description ? `<summary>${escapeXml(project.data.description)}</summary>` : ""}
  </entry>`;
		}
	)
	.join("\n")}
</feed>`;

	return new Response(atom, {
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
		},
	});
}

function escapeXml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
