import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "interview-prep",
  name: "Interview prep",
  icon: "message-square-more",
  description: "Prepare answers that sound like you",
  longDescription:
    "Turn a job description and your experience into focused practice questions, answer ideas, and a plan for the gaps.",
  categories: ["Personal", "Work"],
  template:
    "Help me prepare for a {{format}} interview for the role of {{role}} at {{company}}." +
    "\n\nJob description or role requirements:\n{{job_description}}" +
    "\n\nMy relevant experience:\n{{experience}}" +
    "\n\n[if concerns]Topics I am worried about:\n{{concerns}}[endif]" +
    "\n\nCreate a focused practice set with likely questions, what each question is testing, and answer points based only on my experience. Include follow-up questions and suggest honest ways to discuss gaps. Do not write polished answers for me.",
  fields: [
    {
      label: "Role",
      placeholder: "{{role}}",
      type: "text",
      required: true,
      placeholderText: "e.g. Senior product designer",
    },
    {
      label: "Company",
      placeholder: "{{company}}",
      type: "text",
      required: true,
      placeholderText: "Who is the interview with?",
    },
    {
      label: "Interview format",
      placeholder: "{{format}}",
      type: "select",
      required: true,
      options: [
        "Screening call",
        "Technical interview",
        "Behavioural interview",
        "Final interview",
      ],
    },
    {
      label: "Job description",
      placeholder: "{{job_description}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste the job description or key requirements",
    },
    {
      label: "Relevant experience",
      placeholder: "{{experience}}",
      type: "textarea",
      required: true,
      placeholderText: "Projects, results, skills, and examples you can talk about",
    },
    {
      label: "Concerns",
      placeholder: "{{concerns}}",
      type: "textarea",
      placeholderText: "Optional. What do you want to practise most?",
    },
  ],
};

export default template;
