export type PromptField = {
  label: string;
  placeholder: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "multi-select"
    | "number"
    | "toggle"
    | "list";
  required?: boolean;
  options?: string[];
  placeholderText?: string;
  help?: string;
  defaultValue?: string | number | boolean | string[];
  onText?: string;
  offText?: string;
};

export type PromptCategory =
  | "Analysis"
  | "Automation"
  | "Communication"
  | "Creative"
  | "Data"
  | "Development"
  | "Editing"
  | "Education"
  | "Marketing"
  | "Personal"
  | "Planning"
  | "Research"
  | "Work"
  | "Writing";

export type PromptTemplate = {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  categories: PromptCategory[];
  template: string;
  fields: PromptField[];
};

const templateModules = import.meta.glob("./templates/*.ts", {
  eager: true,
  import: "default",
}) as Record<string, PromptTemplate>;

export const promptTemplates = Object.values(templateModules).sort((a, b) =>
  a.id.localeCompare(b.id),
);
