import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "code-snippet",
  name: "Code snippet generator",
  icon: "code-2",
  description: "Get a focused implementation",
  longDescription:
    "Describe the task and let the prompt ask for the code, tradeoffs, and setup details that matter.",
  categories: ["Development"],
  template:
    "Write a {{language}} code snippet to `{{task}}`." +
    "\n\n[if framework]If applicable, use the {{framework}} framework.[endif]" +
    "\n\n[if packages]The following packages are available and can also be used:" +
    "\n{{default_packages.toList}}" +
    "\n{{custom_packages.toList}}[endif]",
  fields: [
    {
      label: "Task description",
      placeholder: "{{task}}",
      type: "textarea",
      required: true,
      placeholderText: "What should the code do?",
    },
    {
      label: "Programming language",
      placeholder: "{{language}}",
      type: "select",
      required: true,
      options: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
    },
    {
      label: "Framework",
      placeholder: "{{framework}}",
      type: "select",
      options: [
        "Laravel",
        "Symfony",
        "React",
        "Astro",
        "Next.js",
        "Nuxt",
        "SvelteKit",
        "Vue.js",
        "Svelte",
        "SolidJS",
        "Django",
        "Express",
        "Flask",
        "Ruby on Rails",
      ],
    },
    {
      label: "Use packages",
      placeholder: "{{packages}}",
      type: "toggle",
      onText: "Yes, include packages",
      offText: "No packages",
    },
    {
      label: "Available packages",
      placeholder: "{{default_packages}}",
      type: "multi-select",
      options: ["React", "Vite", "Vite+", "Tailwind", "Node", "Vue", "Axios", "Alpinejs"],
    },
    {
      label: "Custom packages",
      placeholder: "{{custom_packages}}",
      type: "list",
      help: "Add package names one at a time.",
    },
  ],
};

export default template;
