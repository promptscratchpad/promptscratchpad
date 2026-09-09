import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "learning-plan",
  name: "Learning plan",
  icon: "book-open",
  description: "Make a study plan you can stick to",
  longDescription:
    "Get a focused learning path that fits your starting point, available time, and the result you want to reach.",
  categories: ["Education", "Personal"],
  template:
    "Create a {{duration}} learning plan for {{subject}}." +
    "\n\nMy current level: {{level}}" +
    "\nTime available: {{time}}" +
    "\nGoal: {{goal}}" +
    "\n\n[if preferences]Learning preferences:\n{{preferences.toList}}[endif]" +
    "\n\nOrganise the plan into weekly milestones. For each week, give me the concepts to learn, one practical exercise, and a way to check my understanding. Focus on the smallest useful path and point out what I can skip for now.",
  fields: [
    {
      label: "Subject",
      placeholder: "{{subject}}",
      type: "text",
      required: true,
      placeholderText: "e.g. SQL for product analytics",
    },
    {
      label: "Current level",
      placeholder: "{{level}}",
      type: "select",
      required: true,
      options: ["Starting from scratch", "Some experience", "Comfortable", "Advanced"],
    },
    {
      label: "Time available",
      placeholder: "{{time}}",
      type: "text",
      required: true,
      placeholderText: "e.g. 4 hours per week",
    },
    {
      label: "Goal",
      placeholder: "{{goal}}",
      type: "textarea",
      required: true,
      placeholderText: "What do you want to be able to do?",
    },
    {
      label: "Plan length",
      placeholder: "{{duration}}",
      type: "select",
      required: true,
      options: ["4-week", "8-week", "12-week"],
    },
    {
      label: "Learning preferences",
      placeholder: "{{preferences}}",
      type: "checkbox",
      options: ["Projects", "Reading", "Videos", "Quizzes", "Flashcards"],
      help: "Pick any formats that work well for you.",
    },
  ],
};

export default template;
