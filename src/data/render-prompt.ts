import type { FormValues, FieldValue } from "../components/types";

export function hasValue(value: FieldValue | undefined) {
  return Array.isArray(value)
    ? value.some(Boolean)
    : value !== undefined && value !== "" && value !== null && value !== false;
}

export function renderPrompt(template: string, values: FormValues) {
  let output = template.replace(
    /\[if\s+([^\]]+)\]([\s\S]*?)\[endif\]/g,
    (_, key: string, content: string) => {
      const value = values[`{{${key.trim()}}}`] ?? values[`@{{${key.trim()}}}`];
      return hasValue(value) ? content : "";
    },
  );
  output = output.replace(/@?\{\{([^}]+)\}\}/g, (match, token: string) => {
    const [key, modifier] = token.trim().split(".");
    const value = values[`{{${key}}}`] ?? values[`@{{${key}}}`];
    if (!hasValue(value)) return match;
    const stringValue = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value);
    if (modifier === "toList")
      return Array.isArray(value)
        ? value
            .filter(Boolean)
            .map((item) => `• ${item}`)
            .join("\n")
        : `• ${value}`;
    if (modifier === "toString") return stringValue;
    if (modifier === "toLower") return stringValue.toLowerCase();
    return stringValue;
  });
  return output
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
