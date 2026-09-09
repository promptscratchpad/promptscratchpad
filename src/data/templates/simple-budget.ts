import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "simple-budget",
  name: "Simple budget",
  icon: "wallet-cards",
  description: "Make a budget from real numbers",
  longDescription:
    "Organise income and spending into a plan that shows what is fixed, what can move, and where your stated goals fit.",
  categories: ["Personal", "Planning"],
  template:
    "Help me make a monthly budget using these figures." +
    "\n\nIncome:\n{{income}}" +
    "\n\nRegular spending:\n{{regular_spending}}" +
    "\n\nFlexible spending:\n{{flexible_spending}}" +
    "\n\nSavings or debt goal: {{goal}}" +
    "\n\n[if priorities]Spending priorities:\n{{priorities.toList}}[endif]" +
    "\n\nGroup the figures into clear categories, calculate what remains, and show a simple monthly plan. Point out missing or ambiguous numbers and suggest changes in order of impact. Do not assume that I can cut essential costs.",
  fields: [
    {
      label: "Income",
      placeholder: "{{income}}",
      type: "textarea",
      required: true,
      placeholderText: "List monthly income and amounts",
    },
    {
      label: "Regular spending",
      placeholder: "{{regular_spending}}",
      type: "textarea",
      required: true,
      placeholderText: "Rent, bills, subscriptions, and other fixed costs",
    },
    {
      label: "Flexible spending",
      placeholder: "{{flexible_spending}}",
      type: "textarea",
      required: true,
      placeholderText: "Food, travel, hobbies, and other variable costs",
    },
    {
      label: "Savings or debt goal",
      placeholder: "{{goal}}",
      type: "text",
      required: true,
      placeholderText: "e.g. save £300 per month",
    },
    {
      label: "Priorities",
      placeholder: "{{priorities}}",
      type: "checkbox",
      options: [
        "Build an emergency fund",
        "Pay down debt",
        "Save for a purchase",
        "Spend more on quality of life",
      ],
    },
  ],
};

export default template;
