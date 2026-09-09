import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "weekly-review",
  name: "Weekly review",
  icon: "notebook-tabs",
  description: "Learn from the week and choose what matters next",
  longDescription:
    "Turn a messy week of notes into a short reflection, a few lessons, and a next-week plan you can actually finish.",
  categories: ["Personal", "Planning"],
  template:
    "Help me review my week." +
    "\n\nWhat happened:\n{{week_notes}}" +
    "\n\nMy priorities for next week:\n{{priorities.toList}}" +
    "\n\n[if energy]My current energy or capacity:\n{{energy}}[endif]" +
    "\n\nSummarise what I finished, what moved forward, what got stuck, and what I learned. Then suggest a short plan for next week with no more than five concrete actions. Point out commitments I should renegotiate and questions I should carry forward.",
  fields: [
    {
      label: "Week notes",
      placeholder: "{{week_notes}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste notes, tasks, calendar highlights, or a brain dump",
    },
    {
      label: "Next-week priorities",
      placeholder: "{{priorities}}",
      type: "list",
      required: true,
      help: "Add the outcomes that matter most next week.",
    },
    {
      label: "Energy or capacity",
      placeholder: "{{energy}}",
      type: "select",
      options: ["Low", "Typical", "High"],
      defaultValue: "Typical",
    },
  ],
};

export default template;
