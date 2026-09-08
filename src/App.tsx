import { useMemo, useState } from "react";
import { usePostHog } from "@posthog/react";
import {
  promptTemplates,
  type PromptCategory,
  type PromptField,
  type PromptTemplate,
} from "./data/prompts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PromptForm } from "./components/PromptForm";
import { PromptLibrary } from "./components/PromptLibrary";
import { PromptPreview } from "./components/PromptPreview";
import type { FieldValue, FormValues } from "./components/types";
import { Icon } from "./components/Icon";

function defaultValue(field: PromptField): FieldValue {
  if (field.type === "toggle") return field.defaultValue ?? false;
  if (["checkbox", "multi-select", "list"].includes(field.type)) return field.defaultValue ?? [];
  return field.defaultValue ?? "";
}

function initialValues(template: PromptTemplate): FormValues {
  return Object.fromEntries(
    template.fields.map((field) => [field.placeholder, defaultValue(field)]),
  );
}

function hasValue(value: FieldValue | undefined) {
  return Array.isArray(value)
    ? value.some(Boolean)
    : value !== undefined && value !== "" && value !== null && value !== false;
}

function renderPrompt(template: string, values: FormValues) {
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

function App({ isPostHogConfigured }: { isPostHogConfigured: boolean }) {
  const posthog = usePostHog();
  const [selectedId, setSelectedId] = useState(promptTemplates[0].id);
  const [values, setValues] = useState<FormValues>(() => initialValues(promptTemplates[0]));
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "All prompts">(
    "All prompts",
  );
  const selectedTemplate =
    promptTemplates.find((template) => template.id === selectedId) ?? promptTemplates[0];
  const categories: (PromptCategory | "All prompts")[] = [
    "All prompts",
    ...new Set(promptTemplates.flatMap((template) => template.categories)),
  ];
  const filteredTemplates = useMemo(
    () =>
      promptTemplates.filter(
        (template) =>
          (activeCategory === "All prompts" || template.categories.includes(activeCategory)) &&
          `${template.name} ${template.description}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [activeCategory, query],
  );
  const generatedPrompt = renderPrompt(selectedTemplate.template, values);
  const missingRequired = selectedTemplate.fields.filter(
    (field) => field.required && !hasValue(values[field.placeholder]),
  );
  const chooseTemplate = (template: PromptTemplate) => {
    if (isPostHogConfigured) {
      posthog.capture("prompt_template_selected", { prompt_template_id: template.id });
    }
    setSelectedId(template.id);
    setValues(initialValues(template));
    setCopied(false);
  };
  const resetPrompt = () => {
    if (isPostHogConfigured) {
      posthog.capture("prompt_reset", { prompt_template_id: selectedId });
    }
    setValues(initialValues(selectedTemplate));
  };
  const updateField = (field: PromptField, value: FieldValue) =>
    setValues((current) => ({ ...current, [field.placeholder]: value }));
  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    if (isPostHogConfigured) {
      posthog.capture("prompt_copied", { prompt_template_id: selectedId });
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f4f0] font-sans text-[#2c2926]">
      <Header />
      <main
        id="prompts"
        className="mx-auto grid w-full flex-1 grid-cols-[322px_minmax(0,1fr)] max-[1050px]:grid-cols-[290px_minmax(0,1fr)] max-[720px]:block"
      >
        <PromptLibrary
          templates={filteredTemplates}
          allTemplates={promptTemplates}
          selectedId={selectedId}
          query={query}
          setQuery={setQuery}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          chooseTemplate={chooseTemplate}
        />
        <section className="bg-[#fbfaf7] px-[58px] pb-[60px] pt-[52px] max-[1050px]:px-7 max-[1050px]:py-12 max-[720px]:px-4 max-[720px]:py-[35px]">
          <div className="mx-auto mb-[38px] flex max-w-[990px] items-start justify-between gap-[30px] max-[720px]:mb-7 max-[720px]:block">
            <div>
              <p className="mb-2.5 font-mono text-[10px] font-medium uppercase tracking-[1.6px] text-[#bd4d2e]">
                {selectedTemplate.categories.join(" / ")}
              </p>
              <h2 className="mb-[9px] text-[29px] font-semibold tracking-[-1.1px]">
                {selectedTemplate.name}
              </h2>
              <p className="m-0 max-w-[530px] text-[13px] leading-[1.55] text-[#807a73]">
                {selectedTemplate.longDescription}
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-[7px] border-0 bg-transparent px-0 py-2.5 text-[11px] text-[#807a73] hover:text-[#bd4d2e] max-[720px]:mt-[17px]"
              onClick={resetPrompt}
            >
              <Icon name="rotate-ccw" /> Reset
            </button>
          </div>
          <div className="mx-auto grid max-w-[990px] grid-cols-[minmax(290px,.9fr)_minmax(370px,1.1fr)] items-start gap-5 max-[1050px]:grid-cols-1">
            <PromptForm template={selectedTemplate} values={values} updateField={updateField} />
            <PromptPreview
              generatedPrompt={generatedPrompt}
              missingRequired={missingRequired.map((field) => field.label)}
              copied={copied}
              copyPrompt={copyPrompt}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
