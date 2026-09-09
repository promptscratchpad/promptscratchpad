import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "decision-matrix",
  name: "Decision matrix",
  icon: "scale",
  description: "Compare options before you choose",
  longDescription:
    "Lay out the tradeoffs between a few options, then get a recommendation that matches your priorities and constraints.",
  categories: ["Analysis", "Planning"],
  template:
    "Help me decide between these options:" +
    "\n{{options.toList}}" +
    "\n\nMy decision criteria, in order of importance:" +
    "\n{{criteria.toList}}" +
    "\n\nContext: {{context}}" +
    "\n\n[if constraints]Constraints or deal-breakers:\n{{constraints}}[endif]" +
    "\n\nCompare the options in a table, call out the main tradeoffs, and recommend one. Explain what would change your recommendation.",
  fields: [
    {
      label: "Options",
      placeholder: "{{options}}",
      type: "list",
      required: true,
      help: "Add each option separately.",
    },
    {
      label: "Decision criteria",
      placeholder: "{{criteria}}",
      type: "list",
      required: true,
      help: "Add the factors that matter most to you.",
    },
    {
      label: "Context",
      placeholder: "{{context}}",
      type: "textarea",
      required: true,
      placeholderText: "What are you deciding, and why now?",
    },
    {
      label: "Constraints",
      placeholder: "{{constraints}}",
      type: "textarea",
      placeholderText: "Budget, timing, requirements, or deal-breakers",
    },
  ],
};

export default template;
