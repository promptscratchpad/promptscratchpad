import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "blog-post",
  name: "Blog post generator",
  icon: "type",
  description: "Turn an idea into a draft",
  longDescription:
    "Give your idea a point of view, an audience, and a useful shape. The result is a strong first draft to work from.",
  categories: ["Writing"],
  template:
    "Write a {{tone.toLower}} blog post about {{topic}} for {{audience}}." +
    "\n\n[if word_count]The post should be around {{word_count}} words.[endif]",
  fields: [
    {
      label: "Topic",
      placeholder: "{{topic}}",
      type: "text",
      required: true,
      placeholderText: "e.g. why small teams ship faster",
    },
    {
      label: "Tone",
      placeholder: "{{tone}}",
      type: "select",
      required: true,
      options: ["Professional", "Casual", "Humorous", "Inspirational"],
    },
    {
      label: "Target audience",
      placeholder: "{{audience}}",
      type: "text",
      required: true,
      placeholderText: "e.g. product leaders at startups",
    },
    {
      label: "Approximate word count",
      placeholder: "{{word_count}}",
      type: "number",
      placeholderText: "e.g. 1200",
      help: "Optional. Leave blank for the model to choose.",
    },
  ],
};

export default template;
