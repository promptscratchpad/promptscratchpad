# PromptScratchpad

PromptScratchpad turns reusable prompt templates into simple forms. Fill in the context a prompt needs, preview the rendered result, and copy it into ChatGPT, Claude, Gemini, or another AI tool.

The project is built for community-contributed prompt templates. Templates are kept as small, readable TypeScript files and loaded automatically by the app.

## Features

- Form-driven prompt templates with live preview.
- Required fields, defaults, optional fields, and multiple input types.
- Conditional prompt sections.
- Placeholder modifiers for strings, lowercase output, and lists.
- Search and category filtering.
- Raw Lucide icon names in the UI and templates.
- Hash-based routes for the prompt library and About page.
- Tailwind CSS styling.

## Getting started

Requirements:

- Node.js
- pnpm
- Vite+

Install dependencies and start the development server:

```bash
pnpm install
vp dev
```

The app will be available at `http://localhost:5173/`.

The routes are:

- `/#/` for the prompt library.
- `/#/about` for project information and package licenses.

### Optional analytics

PromptScratchpad supports anonymous PostHog tracking for successful prompt copies. To enable it, copy `.env.example` to `.env.local` and add the project key from the EU PostHog data region:

```bash
cp .env.example .env.local
```

Analytics uses cookieless tracking, in-memory persistence, no person profiles, no autocapture, and no session recording. Anonymous pageviews include the initial page and hash-route changes. The only custom event is `prompt_copied`, which includes the prompt template ID and never includes the rendered prompt or form values. PostHog's cookieless server hash mode must be enabled in the PostHog project settings.

## Add a prompt template

Templates live in [`src/data/templates`](./src/data/templates). Create a new `.ts` file that default-exports a `PromptTemplate`:

```ts
import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "release-notes",
  name: "Release notes",
  icon: "notebook-pen",
  description: "Turn changes into clear release notes",
  longDescription: "Summarise product changes for a clear release announcement.",
  categories: ["Writing"],
  template: "Write release notes for {{product}} based on:\n\n{{changes}}",
  fields: [
    {
      label: "Product name",
      placeholder: "{{product}}",
      type: "text",
      required: true,
    },
    {
      label: "Changes",
      placeholder: "{{changes}}",
      type: "textarea",
      required: true,
    },
  ],
};

export default template;
```

Every `.ts` file in the templates folder is loaded automatically. Keep the filename and `id` in lowercase kebab-case, and make sure the ID is unique.

### Fields

Supported field types:

- `text`, `textarea`, and `number`
- `select` and `radio` for one choice
- `checkbox` and `multi-select` for multiple choices
- `toggle` for an on or off choice
- `list` for multiple custom values

Useful field properties include `required`, `options`, `defaultValue`, `placeholderText`, `help`, `onText`, and `offText`.

### Prompt syntax

Insert field values with their placeholders:

```text
Write a report about {{topic}} for {{audience}}.
```

Supported modifiers include:

- `{{value.toString}}` converts a value to text.
- `{{values.toList}}` renders array values as a bulleted list.
- `{{tone.toLower}}` converts a value to lowercase.

Use conditional sections for optional content:

```text
[if framework]Use the {{framework}} framework.[endif]
```

### Categories

Categories currently accept `Analysis`, `Automation`, `Communication`, `Creative`, `Data`, `Development`, `Editing`, `Education`, `Marketing`, `Personal`, `Planning`, `Research`, `Work` or `Writing`.

### Icons

Use raw Lucide icon names in kebab-case, such as `sparkles`, `code-2`, or `notebook-pen`.

## Project structure

```text
src/
├── components/       Reusable React UI components
├── data/
│   ├── prompts.ts    Template types and automatic template loading
│   └── templates/    Community prompt templates and contributor guide
├── App.tsx           Prompt library state and rendering logic
├── index.css         Tailwind CSS entry point
└── main.tsx          React Router setup
```

## Scripts

```bash
vp dev      # Start the development server
vp build    # Type-check and build for production
vp check    # Format, lint, and type-check
vp test     # Run tests
vp lint     # Run the linter
```

Before opening a pull request, run:

```bash
vp check
vp build
```

## Contribute

1. Create a branch for your change.
2. Add or update a `.ts` file template or UI feature.
3. Test the change in the development app.
4. Run the validation commands above.
5. Open a pull request with a concise description of the change.

For prompt templates, keep the requested context focused and explain the template's intended use in its description.
