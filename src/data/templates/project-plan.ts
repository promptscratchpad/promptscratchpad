import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "project-plan",
  name: "Project plan",
  icon: "calendar-range",
  description: "Turn a goal into a workable plan",
  longDescription:
    "Break a project into milestones, tasks, owners, and risks without losing sight of the outcome you actually need.",
  categories: ["Planning", "Work"],
  template:
    "Create a practical project plan for {{project}}." +
    "\n\nDesired outcome: {{outcome}}" +
    "\nDeadline: {{deadline}}" +
    "\nTeam or owner: {{team}}" +
    "\n\n[if constraints]Constraints:\n{{constraints}}[endif]" +
    "\n\nUse these project details if they are relevant:\n{{details}}" +
    "\n\nInclude milestones with dates, tasks with owners, dependencies, risks and mitigations, and a short list of questions I should answer before work starts. Make reasonable assumptions, label them, and keep the plan realistic for the time available.",
  fields: [
    {
      label: "Project",
      placeholder: "{{project}}",
      type: "text",
      required: true,
      placeholderText: "e.g. launch a customer help centre",
    },
    {
      label: "Desired outcome",
      placeholder: "{{outcome}}",
      type: "textarea",
      required: true,
      placeholderText: "What should be true when this is finished?",
    },
    {
      label: "Deadline",
      placeholder: "{{deadline}}",
      type: "text",
      required: true,
      placeholderText: "e.g. 30 June",
    },
    {
      label: "Team or owner",
      placeholder: "{{team}}",
      type: "text",
      required: true,
      placeholderText: "e.g. me and two engineers",
    },
    {
      label: "Constraints",
      placeholder: "{{constraints}}",
      type: "textarea",
      placeholderText: "Budget, scope, tools, or approvals",
    },
    {
      label: "Project details",
      placeholder: "{{details}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste notes, requirements, or a rough brief",
    },
  ],
};

export default template;
