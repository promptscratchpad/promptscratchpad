import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "data-analysis",
  name: "Data analysis brief",
  icon: "chart-no-axes-combined",
  description: "Turn a dataset into useful findings",
  longDescription:
    "Give an AI tool the question, the shape of your data, and the output you need so the analysis stays grounded in what you provided.",
  categories: ["Data", "Research"],
  template:
    "Analyse the dataset described below to answer this question: {{question}}" +
    "\n\nDataset or sample rows:\n```\n{{dataset}}\n```" +
    "\n\nRelevant columns and definitions:\n{{columns}}" +
    "\n\n[if context]Business or research context:\n{{context}}[endif]" +
    "\n\nReturn the key findings, show the calculations or queries used, flag missing data and assumptions, and separate observations from recommendations. Do not invent values that are not in the dataset.",
  fields: [
    {
      label: "Question",
      placeholder: "{{question}}",
      type: "textarea",
      required: true,
      placeholderText: "What do you want to find out?",
    },
    {
      label: "Dataset or sample",
      placeholder: "{{dataset}}",
      type: "textarea",
      required: true,
      placeholderText: "Paste a sample, schema, or describe where the data lives",
      help: "Remove personal or confidential data before pasting.",
    },
    {
      label: "Columns and definitions",
      placeholder: "{{columns}}",
      type: "textarea",
      required: true,
      placeholderText: "e.g. signup_date: account creation date",
    },
    {
      label: "Context",
      placeholder: "{{context}}",
      type: "textarea",
      placeholderText: "What decision will this analysis support?",
    },
  ],
};

export default template;
