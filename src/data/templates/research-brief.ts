import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "research-brief",
  name: "Research brief",
  icon: "search-check",
  description: "Turn a broad question into a research plan",
  longDescription:
    "Define what you need to learn, where uncertainty sits, and what evidence would make the answer useful.",
  categories: ["Research", "Analysis"],
  template:
    "Create a research brief for this question: {{question}}" +
    "\n\nWhy I need to answer it:\n{{purpose}}" +
    "\n\nAudience: {{audience}}" +
    "\n\n[if known]What I already know or suspect:\n{{known}}[endif]" +
    "\n\n[if limits]Limits on time, access, or budget:\n{{limits}}[endif]" +
    "\n\nDefine the scope, key sub-questions, terms to clarify, useful sources or participants, and a recommended order of work. Separate facts from assumptions. End with the evidence that would support a confident answer and the evidence that would change it.",
  fields: [
    {
      label: "Research question",
      placeholder: "{{question}}",
      type: "textarea",
      required: true,
      placeholderText: "What do you need to find out?",
    },
    {
      label: "Purpose",
      placeholder: "{{purpose}}",
      type: "textarea",
      required: true,
      placeholderText: "What decision or piece of work will this support?",
    },
    {
      label: "Audience",
      placeholder: "{{audience}}",
      type: "text",
      required: true,
      placeholderText: "Who will use the answer?",
    },
    {
      label: "What I already know",
      placeholder: "{{known}}",
      type: "textarea",
      placeholderText: "Optional. Existing evidence, assumptions, or open questions",
    },
    {
      label: "Limits",
      placeholder: "{{limits}}",
      type: "textarea",
      placeholderText: "Optional. Time, access, budget, or privacy limits",
    },
  ],
};

export default template;
