import { useMemo, useState } from "react";
import { promptTemplates, type PromptField, type PromptTemplate } from "./data/prompts";
import "./App.css";

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
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
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
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholderText}
        rows={4}
      />
    );
  if (field.type === "number")
    return (
      <input
        type="number"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholderText}
      />
    );
  if (field.type === "select")
    return (
      <select value={String(value)} onChange={(event) => onChange(event.target.value)}>
        <option value="">Choose an option</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  if (field.type === "radio")
    return (
      <div className="choice-grid">
        {options.map((option) => (
          <label className="choice" key={option}>
            <input
              type="radio"
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
      <div className="choice-grid">
        {options.map((option) => (
          <label className="choice" key={option}>
            <input
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
        className={`toggle ${value ? "on" : ""}`}
        aria-pressed={Boolean(value)}
        onClick={() => onChange(!value)}
      >
        <span />
        {value ? (field.onText ?? "Enabled") : (field.offText ?? "Disabled")}
      </button>
    );
  if (field.type === "list") {
    const items = Array.isArray(value) ? value : [];
    return (
      <div className="list-field">
        {items.map((item, index) => (
          <div className="list-row" key={`${field.placeholder}-${index}`}>
            <input
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
              className="icon-button"
              aria-label="Remove item"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              {icon("x")}
            </button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={() => onChange([...items, ""])}>
          {icon("plus")} Add item
        </button>
      </div>
    );
  }
  return (
    <input
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
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Prompt Foundry home">
          <span className="brand-mark">✦</span>
          <span>
            Prompt<span>Scratchpad</span>
          </span>
        </a>
        <nav>
          <a className="nav-active" href="#prompts">
            Prompts
          </a>
          <a href="#about">About</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub {icon("external")}
          </a>
        </nav>
        <button className="contribute-button" type="button">
          Contribute a prompt <span>↗</span>
        </button>
      </header>
      <main id="prompts" className="workspace">
        <aside className="sidebar">
          <div className="sidebar-intro">
            <p className="eyebrow">Prompt library</p>
            <h1>
              Start with a prompt.
              <br />
              <em>Make it yours.</em>
            </h1>
            <p className="intro-copy">
              Community-built prompt templates for better conversations with AI.
            </p>
          </div>
          <label className="search">
            <span>{icon("search")}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search prompts"
            />
          </label>
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                type="button"
                className={activeCategory === category ? "active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span>
                  {category === "All prompts"
                    ? promptTemplates.length
                    : promptTemplates.filter((template) => template.categories.includes(category))
                        .length}
                </span>
              </button>
            ))}
          </div>
          <div className="template-list">
            {filteredTemplates.map((template) => (
              <button
                type="button"
                className={`template-card ${selectedId === template.id ? "selected" : ""}`}
                key={template.id}
                onClick={() => chooseTemplate(template)}
              >
                <span className="template-icon">{template.icon}</span>
                <span className="template-copy">
                  <strong>{template.name}</strong>
                  <small>{template.description}</small>
                  <span className="template-meta">
                    {template.fields.length} fields <i>·</i> {template.categories[0]}
                  </span>
                </span>
                {selectedId === template.id && <span className="selected-dot" />}
              </button>
            ))}
            {filteredTemplates.length === 0 && (
              <p className="empty-state">No prompts match that search.</p>
            )}
          </div>
        </aside>
        <section className="editor">
          <div className="editor-header">
            <div>
              <p className="eyebrow">{selectedTemplate.categories.join(" / ")}</p>
              <h2>{selectedTemplate.name}</h2>
              <p>{selectedTemplate.longDescription}</p>
            </div>
            <button
              type="button"
              className="reset-button"
              onClick={() => setValues(initialValues(selectedTemplate))}
            >
              {icon("rotate")} Reset
            </button>
          </div>
          <div className="editor-grid">
            <form className="form-card" onSubmit={(event) => event.preventDefault()}>
              <div className="card-heading">
                <div>
                  <span className="step">01</span>
                  <div>
                    <h3>Fill in the details</h3>
                    <p>Give the prompt the context it needs.</p>
                  </div>
                </div>
                <span className="required-note">* Required</span>
              </div>
              <div className="field-stack">
                {selectedTemplate.fields.map((field) => (
                  <label className="field" key={field.placeholder}>
                    <span className="field-label">
                      {field.label}
                      {field.required && <b>*</b>}
                    </span>
                    <FieldControl
                      field={field}
                      value={values[field.placeholder]}
                      onChange={(value) => updateField(field, value)}
                    />
                    {field.help && <small>{field.help}</small>}
                  </label>
                ))}
              </div>
            </form>
            <section className="preview-card">
              <div className="card-heading">
                <div>
                  <span className="step">02</span>
                  <div>
                    <h3>Your prompt</h3>
                    <p>Ready to copy into your favourite AI tool.</p>
                  </div>
                </div>
                <span className="live-pill">
                  <i /> Live
                </span>
              </div>
              <div className={`prompt-output ${missingRequired.length ? "has-missing" : ""}`}>
                {generatedPrompt || (
                  <span className="placeholder-output">
                    Your completed prompt will appear here.
                  </span>
                )}
              </div>
              {missingRequired.length > 0 && (
                <p className="validation-note">
                  Add {missingRequired.map((field) => field.label).join(" and ")} to complete this
                  prompt.
                </p>
              )}
              <div className="preview-actions">
                <button
                  type="button"
                  className="copy-button"
                  onClick={copyPrompt}
                  disabled={missingRequired.length > 0}
                >
                  {icon(copied ? "check" : "copy")} {copied ? "Copied" : "Copy prompt"}
                </button>
                <span className="char-count">{generatedPrompt.length} characters</span>
              </div>
              <div className="output-tip">
                <span>✦</span>
                <p>
                  <strong>Tip</strong> Paste this into ChatGPT, Claude, Gemini, or any other AI
                  assistant.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>
      <footer>
        <span>Made for curious people and better prompts.</span>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          Suggest an improvement {icon("external")}
        </a>
      </footer>
    </div>
  );
}

export default App;
