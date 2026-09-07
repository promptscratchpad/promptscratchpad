import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "meeting-notes",
  name: "Meeting notes",
  icon: "list-todo",
  description: "Turn a transcript into action",
  longDescription:
    "Summarise the useful parts of a meeting and make the next actions hard to miss.",
  categories: ["Work"],
  template:
    "Turn the following meeting notes into a {{style.toLower}} summary for {{audience}}." +
    "\n\nHighlight decisions, open questions, and action items with owners." +
    "\n\nNotes:\n{{notes}}",
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
};

export default template;
