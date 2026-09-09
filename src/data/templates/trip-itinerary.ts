import type { PromptTemplate } from "../prompts";

const template: PromptTemplate = {
  id: "trip-itinerary",
  name: "Trip itinerary",
  icon: "map",
  description: "Plan days that leave room to breathe",
  longDescription:
    "Build a realistic itinerary around your dates, interests, pace, and practical limits, with enough space for changing plans.",
  categories: ["Planning", "Personal"],
  template:
    "Plan a {{pace}} trip to {{destination}} from {{dates}}." +
    "\n\nTravellers: {{travellers}}" +
    "\nInterests:\n{{interests.toList}}" +
    "\n\n[if constraints]Constraints or preferences:\n{{constraints}}[endif]" +
    "\n\nCreate a day-by-day plan with a few anchor activities, estimated travel time between places, meal ideas, and free time. Group nearby activities together. Flag anything that needs advance booking and give a cheaper or lower-effort alternative where useful.",
  fields: [
    {
      label: "Destination",
      placeholder: "{{destination}}",
      type: "text",
      required: true,
      placeholderText: "e.g. Lisbon",
    },
    {
      label: "Dates",
      placeholder: "{{dates}}",
      type: "text",
      required: true,
      placeholderText: "e.g. 12 to 17 September",
    },
    {
      label: "Travellers",
      placeholder: "{{travellers}}",
      type: "text",
      required: true,
      placeholderText: "e.g. two adults and one child",
    },
    {
      label: "Pace",
      placeholder: "{{pace}}",
      type: "select",
      required: true,
      options: ["Slow", "Balanced", "Packed"],
    },
    {
      label: "Interests",
      placeholder: "{{interests}}",
      type: "checkbox",
      required: true,
      options: ["Food", "History", "Museums", "Nature", "Shopping", "Nightlife"],
    },
    {
      label: "Constraints",
      placeholder: "{{constraints}}",
      type: "textarea",
      placeholderText: "Optional. Budget, mobility needs, dietary needs, or places to avoid",
    },
  ],
};

export default template;
