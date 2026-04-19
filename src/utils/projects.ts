import type { CollectionEntry } from "astro:content";

type ProjectEntry = CollectionEntry<"projects">;

export function sortProjects(projects: ProjectEntry[]) {
	return projects.sort((a, b) => b.data.order_by - a.data.order_by);
}

export function getProjectDisplayDate(project: ProjectEntry) {
	return project.data.date;
}

export function getProjectPublishedDate(project: ProjectEntry) {
	if (!project.data.date) {
		return undefined;
	}

	const parsedDate = new Date(project.data.date);
	return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}
