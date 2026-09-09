import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "customer-reply",
  name: "Customer reply",
  icon: "message-circle-reply",
  description: "Draft a clear, human support reply",
  longDescription:
    "Write a reply that addresses the customer's actual problem, sets the right expectation, and gives them a clear next step.",
  categories: ["Communication", "Work"],
  template:
    "Draft a {{tone.toLower}} reply to this customer." +
    "\n\nCustomer message:\n{{message}}" +
    "\n\nWhat we can offer:\n{{resolution}}" +
    "\n\n[if policy]Relevant policy or limits:\n{{policy}}[endif]" +
    "\n\nKeep the reply {{length.toLower}}. Acknowledge the issue without admitting facts we cannot verify, explain the next step, and avoid jargon. Do not promise anything outside the information provided.",
  fields: [
    {
      label: "Customer message",
      placeholder: "{{message}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste the customer's message",
    },
    {
      label: "What we can offer",
      placeholder: "{{resolution}}",
      type: "textarea",
      required: true,
      placeholderText: "Refund, replacement, explanation, escalation, or next step",
    },
    {
      label: "Tone",
      placeholder: "{{tone}}",
      type: "select",
      required: true,
      options: ["Warm", "Direct", "Apologetic", "Reassuring"],
    },
    {
      label: "Length",
      placeholder: "{{length}}",
      type: "select",
      required: true,
      options: ["Short", "Moderate", "Detailed"],
    },
    {
      label: "Policy or limits",
      placeholder: "{{policy}}",
      type: "textarea",
      placeholderText: "Paste any policy or limits the reply must follow",
    },
  ],
};

export default template;
