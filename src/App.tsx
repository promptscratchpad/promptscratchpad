import { useMemo, useState } from "react";
import { promptTemplates, type PromptField, type PromptTemplate } from "./data/prompts";

type FieldValue = string | number | boolean | string[];
type FormValues = Record<string, FieldValue>;

const icon = (name: string) => {
  const paths: Record<string, string> = {
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-5.2-5.2",
    copy: "M8 8h10v12H8z M6 16H4V4h12v2",
    check: "m5 12 4 4L19 6",
    rotate:
      "M20 11a8.1 8.1 0 0 0-14.9-4.2L3 10m0 0V5m0 5h5 M4 13a8.1 8.1 0 0 0 14.9 4.2L21 14m0 0v5m0-5h-5",
    external: "M14 3h7v7m0-7-9 9 M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
    plus: "M12 5v14M5 12h14",
    x: "M6 6l12 12M18 6 6 18",
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px] fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
    >
      <path d={paths[name]} />
    </svg>
  );
};

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
    if (modifier === "toList")
      return Array.isArray(value)
        ? value
            .filter(Boolean)
            .map((item) => `• ${item}`)
            .join("\n")
        : `• ${value}`;
    if (modifier === "toString")
      return Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value);
    return Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value);
  });
  return output
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: PromptField;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
}) {
  const options = field.options ?? [];
  if (field.type === "textarea")
    return (
      <textarea
        className="min-h-[84px] w-full resize-y rounded-[5px] border border-[#dcd6cf] bg-white px-[11px] py-[10px] text-[12px] leading-[1.5] text-[#2c2926] outline-none placeholder:text-[#bbb3aa] focus:border-[#e49a83] focus:ring-4 focus:ring-[#e86d49]/10"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholderText}
        rows={4}
      />
    );
  if (field.type === "number")
    return (
      <input
        className="w-full rounded-[5px] border border-[#dcd6cf] bg-white px-[11px] py-[10px] text-[12px] text-[#2c2926] outline-none placeholder:text-[#bbb3aa] focus:border-[#e49a83] focus:ring-4 focus:ring-[#e86d49]/10"
        type="number"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholderText}
      />
    );
  if (field.type === "select")
    return (
      <select
        className="w-full rounded-[5px] border border-[#dcd6cf] bg-white px-[11px] py-[10px] text-[12px] text-[#2c2926] outline-none focus:border-[#e49a83] focus:ring-4 focus:ring-[#e86d49]/10"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Choose an option</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  if (field.type === "radio")
    return (
      <div className="flex flex-wrap gap-[7px]">
        {options.map((option) => (
          <label
            className="relative inline-flex min-h-[34px] cursor-pointer items-center gap-[7px] rounded-[5px] border border-[#e1dcd5] bg-white px-[10px] py-[7px] text-[11px] text-[#706a63] has-[:checked]:border-[#efa38d] has-[:checked]:bg-[#fff3ee] has-[:checked]:text-[#bd4d2e]"
            key={option}
          >
            <input
              type="radio"
              className="m-0 h-[13px] w-[13px] accent-[#e86d49]"
              name={field.placeholder}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  if (field.type === "checkbox" || field.type === "multi-select") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="flex flex-wrap gap-[7px]">
        {options.map((option) => (
          <label
            className="relative inline-flex min-h-[34px] cursor-pointer items-center gap-[7px] rounded-[5px] border border-[#e1dcd5] bg-white px-[10px] py-[7px] text-[11px] text-[#706a63] has-[:checked]:border-[#efa38d] has-[:checked]:bg-[#fff3ee] has-[:checked]:text-[#bd4d2e]"
            key={option}
          >
            <input
              className="m-0 h-[13px] w-[13px] accent-[#e86d49]"
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() =>
                onChange(
                  selected.includes(option)
                    ? selected.filter((item) => item !== option)
                    : [...selected, option],
                )
              }
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }
  if (field.type === "toggle")
    return (
      <button
        type="button"
        className="group flex items-center gap-[9px] border-0 bg-transparent p-0 text-[11px] text-[#807a73]"
        aria-pressed={Boolean(value)}
        onClick={() => onChange(!value)}
      >
        <span
          className={`relative h-[19px] w-[34px] rounded-[20px] bg-[#d6d1cb] after:absolute after:left-[2px] after:top-[2px] after:h-[15px] after:w-[15px] after:rounded-full after:bg-white after:shadow-[0_1px_3px_#aaa] after:transition-transform ${value ? "bg-[#4a8f76] after:translate-x-[15px]" : ""}`}
        />
        {value ? (field.onText ?? "Enabled") : (field.offText ?? "Disabled")}
      </button>
    );
  if (field.type === "list") {
    const items = Array.isArray(value) ? value : [];
    return (
      <div className="grid gap-[7px]">
        {items.map((item, index) => (
          <div className="flex gap-[6px]" key={`${field.placeholder}-${index}`}>
            <input
              className="min-w-0 flex-1 rounded-[5px] border border-[#e1dcd5] bg-white px-[11px] py-[10px] text-[12px] text-[#2c2926] outline-none placeholder:text-[#bbb3aa] focus:border-[#e49a83] focus:ring-4 focus:ring-[#e86d49]/10"
              value={item}
              onChange={(event) =>
                onChange(
                  items.map((current, itemIndex) =>
                    itemIndex === index ? event.target.value : current,
                  ),
                )
              }
              placeholder="Add an item"
            />
            <button
              type="button"
              className="grid w-[35px] place-items-center rounded-[5px] border border-[#e1dcd5] bg-white hover:border-[#e49a83] hover:text-[#bd4d2e]"
              aria-label="Remove item"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              {icon("x")}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="flex w-max items-center gap-[5px] border-0 bg-transparent p-0 text-[10px] text-[#bd4d2e]"
          onClick={() => onChange([...items, ""])}
        >
          {icon("plus")} Add item
        </button>
      </div>
    );
  }
  return (
    <input
      className="w-full rounded-[5px] border border-[#dcd6cf] bg-white px-[11px] py-[10px] text-[12px] text-[#2c2926] outline-none placeholder:text-[#bbb3aa] focus:border-[#e49a83] focus:ring-4 focus:ring-[#e86d49]/10"
      value={String(value)}
      onChange={(event) => onChange(event.target.value)}
      placeholder={field.placeholderText}
    />
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(promptTemplates[0].id);
  const [values, setValues] = useState<FormValues>(() => initialValues(promptTemplates[0]));
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All prompts");
  const selectedTemplate =
    promptTemplates.find((template) => template.id === selectedId) ?? promptTemplates[0];
  const categories = [
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
    setSelectedId(template.id);
    setValues(initialValues(template));
    setCopied(false);
  };
  const updateField = (field: PromptField, value: FieldValue) =>
    setValues((current) => ({ ...current, [field.placeholder]: value }));
  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f4f0] font-sans text-[#2c2926]">
      <header className="flex h-[76px] items-center gap-11 border-b border-[#dfdbd4] bg-[#fffdf9]/80 px-[42px]">
        <a
          className="flex items-center gap-2.5 text-[19px] font-bold tracking-[-.7px]"
          href="/"
          aria-label="Prompt Foundry home"
        >
          <span className="grid h-[30px] w-[30px] rotate-[-6deg] place-items-center rounded-[9px] bg-[#e86d49] text-[17px] text-white">
            ✦
          </span>
          <span>
            Prompt<span className="text-[#e86d49]">Scratchpad</span>
          </span>
        </a>
        <nav className="flex items-center gap-[30px] text-[13px] text-[#807a73] max-[720px]:hidden">
          <a className="border-b-2 border-[#e86d49] py-[26px] text-[#2c2926]" href="#prompts">
            Prompts
          </a>
          <a className="border-b-2 border-transparent py-[26px] hover:text-[#2c2926]" href="#about">
            About
          </a>
          <a
            className="flex items-center gap-[5px] border-b-2 border-transparent py-[26px] hover:text-[#2c2926]"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub {icon("external")}
          </a>
        </nav>
        <button
          className="ml-auto rounded-[7px] border border-[#d9d3cc] bg-transparent px-[15px] py-2.5 text-[12px] text-[#2c2926] hover:border-[#e86d49] hover:text-[#bd4d2e] max-[720px]:px-2.5 max-[720px]:py-2 max-[720px]:text-[10px]"
          type="button"
        >
          Contribute a prompt <span>↗</span>
        </button>
      </header>
      <main
        id="prompts"
        className="mx-auto grid w-full flex-1 grid-cols-[322px_minmax(0,1fr)] max-[1050px]:grid-cols-[290px_minmax(0,1fr)] max-[720px]:block"
      >
        <aside className="border-r border-[#dfdbd4] bg-[#f8f6f2] px-6 pb-9 pl-[42px] pt-[52px] max-[1050px]:pl-6 max-[720px]:border-b max-[720px]:border-r-0 max-[720px]:px-[18px] max-[720px]:py-[31px]">
          <div>
            <p className="mb-2.5 font-mono text-[10px] font-medium uppercase tracking-[1.6px] text-[#bd4d2e]">
              Prompt library
            </p>
            <h1 className="mb-[15px] text-[26px] font-semibold leading-[1.12] tracking-[-1.1px] max-[720px]:[&>br]:hidden">
              Start with a prompt.
              <br />
              <em className="font-serif font-medium italic text-[#e86d49]">Make it yours.</em>
            </h1>
            <p className="mb-8 max-w-[220px] text-[12px] leading-[1.55] text-[#807a73] max-[720px]:mb-[23px]">
              Community-built prompt templates for better conversations with AI.
            </p>
          </div>
          <label className="flex h-[37px] items-center gap-2 rounded-[6px] border border-[#dfdbd4] bg-white px-[11px] text-[#a8a198]">
            <span>{icon("search")}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 w-full border-0 bg-transparent text-[12px] text-[#2c2926] outline-none placeholder:text-[#a8a198]"
              placeholder="Search prompts"
            />
          </label>
          <div className="my-[25px] flex flex-wrap gap-[7px] max-[720px]:my-[18px]">
            {categories.map((category) => (
              <button
                type="button"
                className={`rounded-[5px] border-0 px-[9px] py-1.5 text-[11px] text-[#807a73] ${activeCategory === category ? "bg-[#eae5de] font-semibold text-[#2c2926]" : "bg-transparent"}`}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span className="ml-[7px] font-mono text-[10px] text-[#aaa39b]">
                  {category === "All prompts"
                    ? promptTemplates.length
                    : promptTemplates.filter((template) => template.categories.includes(category))
                        .length}
                </span>
              </button>
            ))}
          </div>
          <div className="grid gap-[5px] max-[720px]:flex max-[720px]:overflow-x-auto max-[720px]:pb-1">
            {filteredTemplates.map((template) => (
              <button
                type="button"
                className={`relative flex w-full items-start gap-[11px] rounded-[7px] border p-[11px_10px] text-left ${selectedId === template.id ? "border-[#e7b4a4] bg-[#fffaf6]" : "border-transparent bg-transparent hover:bg-[#f1ede7]"} max-[720px]:min-w-[220px]`}
                key={template.id}
                onClick={() => chooseTemplate(template)}
              >
                <span className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-[6px] bg-[#eee9f7] font-mono text-[12px] font-medium text-[#6e5b91]">
                  {template.icon}
                </span>
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <strong className="text-[12px] font-semibold">{template.name}</strong>
                  <small className="text-[10px] leading-[1.35] text-[#807a73]">
                    {template.description}
                  </small>
                  <span className="font-mono text-[9px] text-[#aaa39b]">
                    {template.fields.length} fields <i>·</i> {template.categories[0]}
                  </span>
                </span>
                {selectedId === template.id && (
                  <span className="absolute right-[11px] top-[15px] h-1.5 w-1.5 rounded-full bg-[#e86d49]" />
                )}
              </button>
            ))}
            {filteredTemplates.length === 0 && (
              <p className="p-3 text-[12px] text-[#807a73]">No prompts match that search.</p>
            )}
          </div>
        </aside>
        <section className="bg-[#fbfaf7] px-[58px] pb-[60px] pt-[62px] max-[1050px]:px-7 max-[1050px]:py-12 max-[720px]:px-4 max-[720px]:py-[35px]">
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
              onClick={() => setValues(initialValues(selectedTemplate))}
            >
              {icon("rotate")} Reset
            </button>
          </div>
          <div className="mx-auto grid max-w-[990px] grid-cols-[minmax(290px,.9fr)_minmax(370px,1.1fr)] items-start gap-5 max-[1050px]:grid-cols-1">
            <form
              className="rounded-[9px] border border-[#dfdbd4] bg-[#fffdf9] p-[25px] shadow-[0_8px_28px_rgba(69,54,39,.035)] max-[720px]:p-[19px]"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#ebe6df] pb-[21px]">
                <div className="flex items-start gap-[11px]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f6e6df] font-mono text-[10px] text-[#bd4d2e]">
                    01
                  </span>
                  <div>
                    <h3 className="mb-[3px] mt-px text-[14px] font-semibold">
                      Fill in the details
                    </h3>
                    <p className="m-0 text-[11px] text-[#807a73]">
                      Give the prompt the context it needs.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[9px] text-[#aaa29a]">* Required</span>
              </div>
              <div className="grid gap-5 pt-6">
                {selectedTemplate.fields.map((field) => (
                  <label className="grid gap-[7px]" key={field.placeholder}>
                    <span className="text-[11px] font-semibold">
                      {field.label}
                      {field.required && <b className="pl-[3px] text-[#e86d49]">*</b>}
                    </span>
                    <FieldControl
                      field={field}
                      value={values[field.placeholder]}
                      onChange={(value) => updateField(field, value)}
                    />
                    {field.help && (
                      <small className="text-[10px] text-[#9b938a]">{field.help}</small>
                    )}
                  </label>
                ))}
              </div>
            </form>
            <section className="sticky top-5 rounded-[9px] border border-[#dfdbd4] bg-[#fffdf9] p-[25px] shadow-[0_8px_28px_rgba(69,54,39,.035)] max-[1050px]:static max-[720px]:p-[19px]">
              <div className="flex items-start justify-between gap-4 border-b border-[#ebe6df] pb-[21px]">
                <div className="flex items-start gap-[11px]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f6e6df] font-mono text-[10px] text-[#bd4d2e]">
                    02
                  </span>
                  <div>
                    <h3 className="mb-[3px] mt-px text-[14px] font-semibold">Your prompt</h3>
                    <p className="m-0 text-[11px] text-[#807a73]">
                      Ready to copy into your favourite AI tool.
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-[5px] font-mono text-[10px] text-[#4a8f76]">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#4a8f76]" /> Live
                </span>
              </div>
              <div
                className={`my-[21px] min-h-[350px] whitespace-pre-wrap rounded-[6px] border bg-[#f8f6f2] p-[19px] font-mono text-[12px] leading-[1.65] text-[#403b36] max-[720px]:min-h-[290px] ${missingRequired.length ? "border-[#edc3b5]" : "border-[#ded8d0]"}`}
              >
                {generatedPrompt || (
                  <span className="font-sans italic text-[#aaa29a]">
                    Your completed prompt will appear here.
                  </span>
                )}
              </div>
              {missingRequired.length > 0 && (
                <p className="mb-3 text-[10px] leading-[1.45] text-[#bd4d2e]">
                  Add {missingRequired.map((field) => field.label).join(" and ")} to complete this
                  prompt.
                </p>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-[5px] border-0 bg-[#e86d49] px-3.5 py-2.5 text-[11px] font-semibold text-white hover:bg-[#bd4d2e] disabled:cursor-not-allowed disabled:opacity-45"
                  onClick={copyPrompt}
                  disabled={missingRequired.length > 0}
                >
                  {icon(copied ? "check" : "copy")} {copied ? "Copied" : "Copy prompt"}
                </button>
                <span className="font-mono text-[10px] text-[#aaa29a]">
                  {generatedPrompt.length} characters
                </span>
              </div>
              <div className="mt-[23px] flex items-start gap-[9px] rounded-[5px] bg-[#f3efe8] p-3 text-[#8c837a]">
                <span className="text-[14px] text-[#e86d49]">✦</span>
                <p className="m-0 text-[10px] leading-[1.5]">
                  <strong className="font-semibold text-[#2c2926]">Tip</strong> Paste this into
                  ChatGPT, Claude, Gemini, or any other AI assistant.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>
      <footer className="flex justify-between border-t border-[#dfdbd4] px-[42px] py-[21px] text-[10px] text-[#9b938a] max-[720px]:flex-col max-[720px]:gap-3 max-[720px]:p-[18px]">
        <span>Made for curious people and better prompts.</span>
        <a
          className="flex items-center gap-1.5 text-[#bd4d2e]"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          Suggest an improvement {icon("external")}
        </a>
      </footer>
    </div>
  );
}

export default App;
