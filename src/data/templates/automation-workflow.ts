import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "automation-workflow",
  name: "Automation workflow",
  icon: "workflow",
  description: "Turn a repetitive task into a reliable workflow",
  longDescription:
    "Describe the work as it happens today, then map a workflow with triggers, steps, handoffs, and failure cases.",
  categories: ["Automation", "Planning"],
  template:
    "Design an automation workflow for {{task}}." +
    "\n\nHow the task works today:\n{{current_process}}" +
    "\n\nTools or systems available:\n{{tools}}" +
    "\n\n[if constraints]Constraints or approval requirements:\n{{constraints}}[endif]" +
    "\n\nThe workflow should include the trigger, each step, the data passed between steps, the person responsible for exceptions, and the expected outcome. Recommend where human review is needed. Call out risks, privacy concerns, and edge cases. If a detail is missing, label it as a question instead of guessing.",
  fields: [
    {
      label: "Task to automate",
      placeholder: "{{task}}",
      type: "text",
      required: true,
      placeholderText: "e.g. route new support requests to the right team",
    },
    {
      label: "Current process",
      placeholder: "{{current_process}}",
      type: "textarea",
      required: true,
      placeholderText: "Describe what happens now, step by step",
    },
    {
      label: "Available tools",
      placeholder: "{{tools}}",
      type: "textarea",
      required: true,
      placeholderText: "e.g. Gmail, Slack, Airtable, and an internal API",
    },
    {
      label: "Constraints",
      placeholder: "{{constraints}}",
      type: "textarea",
      placeholderText: "Optional. Permissions, approvals, volume, or data limits",
    },
  ],
};

export default template;
