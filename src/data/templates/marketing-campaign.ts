import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "marketing-campaign",
  name: "Marketing campaign",
  icon: "megaphone",
  description: "Turn a product idea into a campaign brief",
  longDescription:
    "Set a clear audience, promise, channel plan, and measurement approach before you start writing campaign copy.",
  categories: ["Marketing", "Planning"],
  template:
    "Create a marketing campaign brief for {{product}}." +
    "\n\nTarget audience:\n{{audience}}" +
    "\n\nCampaign goal: {{goal}}" +
    "\n\nCore offer or message:\n{{message}}" +
    "\n\nChannels:\n{{channels.toList}}" +
    "\n\n[if details]Useful product or brand details:\n{{details}}[endif]" +
    "\n\nDefine the audience problem, positioning, key message, proof points to gather, channel-specific content ideas, call to action, timeline, and success metrics. Keep claims tied to the details provided and flag anything that needs evidence.",
  fields: [
    {
      label: "Product or service",
      placeholder: "{{product}}",
      type: "text",
      required: true,
      placeholderText: "What are you promoting?",
    },
    {
      label: "Target audience",
      placeholder: "{{audience}}",
      type: "textarea",
      required: true,
      placeholderText: "Who is this for, and what do they need?",
    },
    {
      label: "Campaign goal",
      placeholder: "{{goal}}",
      type: "select",
      required: true,
      options: ["Awareness", "Leads", "Sales", "Activation", "Retention"],
    },
    {
      label: "Core offer or message",
      placeholder: "{{message}}",
      type: "textarea",
      required: true,
      placeholderText: "What are you offering or asking people to believe?",
    },
    {
      label: "Channels",
      placeholder: "{{channels}}",
      type: "checkbox",
      required: true,
      options: ["Email", "Website", "Search", "Social", "Events", "Partnerships"],
    },
    {
      label: "Product or brand details",
      placeholder: "{{details}}",
      type: "textarea",
      placeholderText: "Optional. Pricing, proof, brand voice, timing, or restrictions",
    },
  ],
};

export default template;
