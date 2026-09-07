import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "character-creator",
  name: "Character creator",
  icon: "sparkles",
  description: "Build a character with depth",
  longDescription:
    "Create a memorable character with a clear voice, strong motivations, and room to surprise.",
  categories: ["Creative"],
  template:
    "Create a character named {{name}}." +
    "\n\nThey are a {{role}}[if traits] with these traits: {{traits.toString}}[endif]." +
    "\n\n[if backstory]Their backstory: {{backstory}}.[endif]",
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
};

export default template;
