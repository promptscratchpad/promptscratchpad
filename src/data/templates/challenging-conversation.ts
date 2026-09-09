import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "challenging-conversation",
  name: "Challenging conversation",
  icon: "messages-square",
  description: "Plan what to say when the stakes are high",
  longDescription:
    "Clarify the issue, protect the relationship, and choose words that leave room for an honest response.",
  categories: ["Communication", "Personal"],
  template:
    "Help me prepare for a challenging conversation with {{person}} about {{issue}}." +
    "\n\nWhat happened:\n{{situation}}" +
    "\n\nWhat I want to achieve:\n{{outcome}}" +
    "\n\n[if concerns]What I am worried might happen:\n{{concerns}}[endif]" +
    "\n\nSuggest a calm opening, a short description of the issue using observable facts, questions that invite their view, and a clear request. Include likely responses and ways to keep the conversation constructive. Do not diagnose either person or assume motives.",
  fields: [
    {
      label: "Person",
      placeholder: "{{person}}",
      type: "text",
      required: true,
      placeholderText: "e.g. a colleague, friend, or family member",
    },
    {
      label: "Issue",
      placeholder: "{{issue}}",
      type: "text",
      required: true,
      placeholderText: "What do you need to talk about?",
    },
    {
      label: "What happened",
      placeholder: "{{situation}}",
      type: "textarea",
      required: true,
      placeholderText: "Describe the specific situation and what was said or done",
    },
    {
      label: "Desired outcome",
      placeholder: "{{outcome}}",
      type: "textarea",
      required: true,
      placeholderText: "What would a good next step look like?",
    },
    {
      label: "Concerns",
      placeholder: "{{concerns}}",
      type: "textarea",
      placeholderText: "Optional. What are you worried might happen?",
    },
  ],
};

export default template;
