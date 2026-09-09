import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "email-draft",
  name: "Email draft",
  icon: "mail-plus",
  description: "Turn rough notes into a clear email",
  longDescription:
    "Start with the point you need to make and the action you want, then shape it into an email that is easy to read and reply to.",
  categories: ["Communication", "Writing"],
  template:
    "Write a {{tone.toLower}} email to {{recipient}} about {{subject}}." +
    "\n\nWhat I need to say:\n{{notes}}" +
    "\n\nThe response or action I need:\n{{action}}" +
    "\n\n[if context]Useful context:\n{{context}}[endif]" +
    "\n\nKeep it {{length.toLower}}. Put the request near the top, use plain language, and make the next step obvious. Do not add facts or commitments that are not in my notes. Include a subject line.",
  fields: [
    {
      label: "Recipient",
      placeholder: "{{recipient}}",
      type: "text",
      required: true,
      placeholderText: "e.g. a supplier I work with",
    },
    {
      label: "Subject",
      placeholder: "{{subject}}",
      type: "text",
      required: true,
      placeholderText: "What is the email about?",
    },
    {
      label: "Tone",
      placeholder: "{{tone}}",
      type: "select",
      required: true,
      options: ["Friendly", "Direct", "Formal", "Warm"],
    },
    {
      label: "Length",
      placeholder: "{{length}}",
      type: "select",
      required: true,
      options: ["Short", "Moderate", "Detailed"],
    },
    {
      label: "Notes",
      placeholder: "{{notes}}",
      type: "textarea",
      required: true,
      placeholderText: "Write the points in any order",
    },
    {
      label: "Requested action",
      placeholder: "{{action}}",
      type: "textarea",
      required: true,
      placeholderText: "What should the recipient do or reply with?",
    },
    {
      label: "Context",
      placeholder: "{{context}}",
      type: "textarea",
      placeholderText: "Optional. Anything the recipient needs to know",
    },
  ],
};

export default template;
