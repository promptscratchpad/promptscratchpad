import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "cv-tailor",
  name: "Tailor a CV",
  icon: "file-user",
  description: "Match your experience to a specific role",
  longDescription:
    "Bring a job description and your existing CV together to find the strongest evidence, missing keywords, and honest improvements.",
  categories: ["Work", "Writing"],
  template:
    "Help me tailor my CV for the role of {{role}}." +
    "\n\nJob description:\n{{job_description}}" +
    "\n\nMy current CV:\n{{cv}}" +
    "\n\n[if priorities]Experience I most want to highlight:\n{{priorities.toList}}[endif]" +
    "\n\nIdentify the requirements this CV already supports, gaps I should address, and vague bullets that need stronger evidence. Suggest revised bullets using only facts from my CV. Do not invent metrics, titles, tools, or experience. Keep the tone direct and professional.",
  fields: [
    {
      label: "Role",
      placeholder: "{{role}}",
      type: "text",
      required: true,
      placeholderText: "e.g. Operations manager",
    },
    {
      label: "Job description",
      placeholder: "{{job_description}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste the job description",
    },
    {
      label: "Current CV",
      placeholder: "{{cv}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste the relevant sections of your CV",
      help: "Remove contact details and other personal information first.",
    },
    {
      label: "Priorities",
      placeholder: "{{priorities}}",
      type: "checkbox",
      options: ["Leadership", "Impact", "Technical skills", "Industry experience", "Career change"],
      help: "Optional. Pick what you want the review to focus on.",
    },
  ],
};

export default template;
