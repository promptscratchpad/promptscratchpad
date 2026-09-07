import type { PromptField, PromptTemplate } from "../data/prompts";

export type FieldValue = string | number | boolean | string[];
export type FormValues = Record<string, FieldValue>;
export type UpdateField = (field: PromptField, value: FieldValue) => void;
export type ChooseTemplate = (template: PromptTemplate) => void;
