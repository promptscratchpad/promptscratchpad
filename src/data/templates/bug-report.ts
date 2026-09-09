import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "bug-report",
  name: "Bug report",
  icon: "bug",
  description: "Turn a problem into a useful report",
  longDescription:
    "Capture the steps, evidence, and impact that help someone reproduce and fix a bug without a long back-and-forth.",
  categories: ["Development", "Work"],
  template:
    "Turn these notes into a clear bug report for {{audience}}." +
    "\n\nNotes:\n{{notes}}" +
    "\n\nEnvironment: {{environment}}" +
    "\n\n[if evidence]Evidence, logs, or screenshots:\n{{evidence}}[endif]" +
    "\n\nUse this structure: title, summary, steps to reproduce, expected result, actual result, impact, and environment. Separate confirmed facts from guesses. Keep anything missing as an explicit question instead of making it up.",
  fields: [
    {
      label: "Audience",
      placeholder: "{{audience}}",
      type: "select",
      required: true,
      options: ["Engineering team", "Support team", "External vendor"],
    },
    {
      label: "Bug notes",
      placeholder: "{{notes}}",
      type: "textarea",
      required: true,
      placeholderText: "What happened? Include any steps you already tried.",
    },
    {
      label: "Environment",
      placeholder: "{{environment}}",
      type: "text",
      required: true,
      placeholderText: "e.g. iPhone 15, iOS 18, app version 2.4",
    },
    {
      label: "Evidence",
      placeholder: "{{evidence}}",
      type: "textarea",
      placeholderText: "Optional. Paste logs, error messages, or links to screenshots",
    },
  ],
};

export default template;
