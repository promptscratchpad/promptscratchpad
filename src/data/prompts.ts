export type PromptField = {
  label: string;
  placeholder: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "multi-select"
    | "number"
    | "toggle"
    | "list";
  required?: boolean;
  options?: string[];
  placeholderText?: string;
  help?: string;
  defaultValue?: string | number | boolean | string[];
  onText?: string;
  offText?: string;
};

export type PromptTemplate = {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  categories: string[];
  template: string;
  fields: PromptField[];
};

// This module mirrors the shape expected from the future community prompt repo.
// Replace this import with a fetch from that repo's generated index when the API is ready.
export const promptTemplates: PromptTemplate[] = [
  {
    id: "character-creator",
    name: "Character creator",
    icon: "sparkles",
    description: "Build a character with depth",
    longDescription:
      "Create a memorable character with a clear voice, strong motivations, and room to surprise.",
    categories: ["Creative"],
    template:
      "Create a character named {{name}}.\n\nThey are a {{role}}[if traits] with these traits: {{traits.toString}}[endif].\n\n[if backstory]Their backstory: {{backstory}}.[endif]",
    fields: [
      {
        label: "Character name",
        placeholder: "{{name}}",
        type: "text",
        required: true,
        placeholderText: "e.g. Mara Voss",
      },
      {
        label: "Role",
        placeholder: "{{role}}",
        type: "select",
        required: true,
        options: ["Hero", "Villain", "Mentor", "Sidekick"],
      },
      {
        label: "Personality traits",
        placeholder: "{{traits}}",
        type: "checkbox",
        options: ["Brave", "Cunning", "Kind", "Reckless", "Mysterious"],
        help: "Pick any traits that fit.",
      },
      {
        label: "Backstory",
        placeholder: "{{backstory}}",
        type: "textarea",
        placeholderText: "What shaped this character?",
      },
    ],
  },
  {
    id: "blog-post",
    name: "Blog post generator",
    icon: "type",
    description: "Turn an idea into a draft",
    longDescription:
      "Give your idea a point of view, an audience, and a useful shape. The result is a strong first draft to work from.",
    categories: ["Writing"],
    template:
      "Write a {{tone}} blog post about {{topic}} for {{audience}}.\n\n[if word_count]The post should be around {{word_count}} words.[endif]",
    fields: [
      {
        label: "Topic",
        placeholder: "{{topic}}",
        type: "text",
        required: true,
        placeholderText: "e.g. Why small teams ship faster",
      },
      {
        label: "Tone",
        placeholder: "{{tone}}",
        type: "select",
        required: true,
        options: ["Professional", "Casual", "Humorous", "Inspirational"],
      },
      {
        label: "Target audience",
        placeholder: "{{audience}}",
        type: "text",
        required: true,
        placeholderText: "e.g. Product leaders at startups",
      },
      {
        label: "Approximate word count",
        placeholder: "{{word_count}}",
        type: "number",
        placeholderText: "e.g. 1200",
        help: "Optional. Leave blank for the model to choose.",
      },
    ],
  },
  {
    id: "code-snippet",
    name: "Code snippet generator",
    icon: "code-2",
    description: "Get a focused implementation",
    longDescription:
      "Describe the task and let the prompt ask for the code, tradeoffs, and setup details that matter.",
    categories: ["Development"],
    template:
      "Write a {{language}} code snippet to `{{task}}`.\n\n[if framework]If applicable, use the {{framework}} framework.[endif]\n\n[if packages]The following packages are available and can also be used:\n{{default_packages.toList}}\n{{custom_packages.toList}}[endif]",
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
        options: ["React", "Laravel", "Express", "Django"],
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
        options: ["React", "Vite", "Tailwind", "Node", "Vue", "Axios"],
      },
      {
        label: "Custom packages",
        placeholder: "{{custom_packages}}",
        type: "list",
        help: "Add package names one at a time.",
      },
    ],
  },
  {
    id: "meeting-notes",
    name: "Meeting notes",
    icon: "list-todo",
    description: "Turn a transcript into action",
    longDescription:
      "Summarise the useful parts of a meeting and make the next actions hard to miss.",
    categories: ["Work"],
    template:
      "Turn the following meeting notes into a concise summary for {{audience}}.\n\nHighlight decisions, open questions, and action items with owners.\n\nNotes:\n{{notes}}",
    fields: [
      {
        label: "Who is this for?",
        placeholder: "{{audience}}",
        type: "text",
        required: true,
        placeholderText: "e.g. The product team",
      },
      {
        label: "Meeting notes",
        placeholder: "{{notes}}",
        type: "textarea",
        required: true,
        placeholderText: "Paste notes or a transcript here",
      },
      {
        label: "Output style",
        placeholder: "{{style}}",
        type: "radio",
        options: ["Concise", "Detailed", "Executive"],
        defaultValue: "Concise",
      },
    ],
  },
];
