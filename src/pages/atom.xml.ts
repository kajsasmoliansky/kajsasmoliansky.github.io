import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const projects = await getCollection("projects");
	const sortedProjects = projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
	const site = context.site!;

	const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Kajsa Smoliansky</title>
  <subtitle>Projekt och uppdateringar från Kajsa Smolianskys arbete med traditionellt måleri och byggnadsvård</subtitle>
  <link href="${site}atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${site}" rel="alternate" type="text/html"/>
  <id>${site}</id>
  <updated>${sortedProjects[0]?.data.date.toISOString() ?? new Date().toISOString()}</updated>
  <author>
    <name>Kajsa Smoliansky</name>
  </author>
${sortedProjects
	.map(
		(project) => `  <entry>
    <title>${escapeXml(project.data.title)}</title>
    <link href="${site}projects/${project.slug}/" rel="alternate" type="text/html"/>
    <id>${site}projects/${project.slug}/</id>
    <published>${project.data.date.toISOString()}</published>
    <updated>${project.data.date.toISOString()}</updated>
    ${project.data.description ? `<summary>${escapeXml(project.data.description)}</summary>` : ""}
  </entry>`
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
