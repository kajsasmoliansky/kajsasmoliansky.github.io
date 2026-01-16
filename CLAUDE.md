# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Kajsa Smoliansky's building restoration business, built with Astro.

## Tech Stack

- **Framework**: Astro 4.x
- **Styling**: Vanilla CSS with custom properties
- **Content**: Markdown with Astro Content Collections
- **Hosting**: GitHub Pages

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript check)
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── content/
│   ├── pages/       # Static page content (home.md, about.md)
│   └── projects/    # Project posts (markdown files)
├── layouts/
│   ├── BaseLayout.astro     # Main HTML wrapper
│   └── ProjectLayout.astro  # Layout for project posts
├── pages/
│   ├── index.astro          # Home page
│   ├── about.astro          # About page
│   └── projects/
│       ├── index.astro      # Projects list
│       └── [...slug].astro  # Dynamic project pages
└── styles/
    └── global.css           # Global styles and CSS variables
```

## Adding Content

### New Project Post

Create a new `.md` file in `src/content/projects/` with frontmatter:

```yaml
---
title: "Project Title"
description: "Brief description"
date: 2024-01-15
---
```

### Editing Page Content

- Home intro: `src/content/pages/home.md`
- About page: `src/content/pages/about.md`
