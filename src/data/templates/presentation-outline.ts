import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "presentation-outline",
  name: "Presentation outline",
  icon: "presentation",
  description: "Shape a talk around one clear message",
  longDescription:
    "Build a presentation with a clear argument, a sensible pace, and slides that help the audience follow the story.",
  categories: ["Communication", "Writing"],
  template:
    "Create an outline for a {{minutes}}-minute presentation about {{topic}} for {{audience}}." +
    "\n\nThe one thing I want the audience to understand or do: {{outcome}}" +
    "\n\nMaterial to use:\n{{material}}" +
    "\n\n[if constraints]Constraints:\n{{constraints}}[endif]" +
    "\n\nGive me a slide-by-slide outline with a purpose, speaker notes, and a rough time budget for each slide. Keep the story focused on the intended outcome. Mark claims that need evidence and suggest a strong opening and closing.",
  fields: [
    {
      label: "Topic",
      placeholder: "{{topic}}",
      type: "text",
      required: true,
      placeholderText: "e.g. our proposal to simplify onboarding",
    },
    {
      label: "Audience",
      placeholder: "{{audience}}",
      type: "text",
      required: true,
      placeholderText: "Who will be in the room?",
    },
    {
      label: "Presentation length (minutes)",
      placeholder: "{{minutes}}",
      type: "number",
      required: true,
      placeholderText: "e.g. 15",
    },
    {
      label: "Intended outcome",
      placeholder: "{{outcome}}",
      type: "textarea",
      required: true,
      placeholderText: "What should the audience understand or do?",
    },
    {
      label: "Material",
      placeholder: "{{material}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste notes, data, research, or an existing draft",
    },
    {
      label: "Constraints",
      placeholder: "{{constraints}}",
      type: "textarea",
      placeholderText: "Optional. Required slides, sensitive topics, or format limits",
    },
  ],
};

export default template;
