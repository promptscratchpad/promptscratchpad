import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "sanitise-clarify-content",
  name: "Sanitise & Clarify Content",
  icon: "highlighter",
  description: "Clean up and clarify existing content",
  longDescription:
    "Rewrite text for a specific audience, tone, length, and level of detail while preserving its original meaning.",
  categories: ["Editing"],
  template:
    "Rewrite the following {{content_type}} " +
    "\n\n[if audience]The recipient is {{audience}}.[endif]" +
    "\n[if tone]Tone: {{tone.toString}}.[endif]" +
    "\n[if detail]Detail: {{detail}}[endif]" +
    "\n[if length]Length: {{length}}.[endif]" +
    "\n\n```\n{{content}}\n```" +
    "\n\n[if avoid]\nDon't include the following in your response:\n{{avoid.toList}}\n[endif]",
  fields: [
    {
      label: "Content Type",
      placeholder: "{{content_type}}",
      type: "select",
      required: true,
      options: ["Text", "Message", "Email", "Documentation"],
    },
    {
      label: "Content",
      placeholder: "{{content}}",
      type: "textarea",
      required: true,
      placeholderText: "",
      help: "When using AI, it is best practice to avoid including sensitive information, personal details, or confidential data in your prompts.",
    },
    {
      label: "Audience",
      placeholder: "{{audience}}",
      type: "select",
      required: true,
      options: ["Technical", "Non-Technical"],
    },
    {
      label: "Tone",
      placeholder: "{{tone}}",
      type: "multi-select",
      required: true,
      options: ["Formal", "Friendly", "Persuasive"],
    },
    {
      label: "Length",
      placeholder: "{{length}}",
      type: "select",
      required: true,
      options: ["Short", "Concise", "500 words"],
    },
    {
      label: "Detail",
      placeholder: "{{detail}}",
      type: "select",
      required: true,
      options: ["High-level Summary", "Deep Dive"],
    },
    {
      label: "Avoid",
      placeholder: "{{avoid}}",
      type: "checkbox",
      options: [
        "Emoji",
        "Em dash",
        "In Conclusion / Summary sections",
        "Lists",
        "Redundant Phrases",
        "Making things up that aren't in the content",
      ],
      help: "Pick any traits that you want the AI to avoid.",
    },
  ],
};

export default template;
