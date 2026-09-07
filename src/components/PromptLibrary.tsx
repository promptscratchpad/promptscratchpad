import type { PromptTemplate } from "../data/prompts";
import { Icon } from "./Icon";
import type { ChooseTemplate } from "./types";

export function PromptLibrary({
  templates,
  allTemplates,
  selectedId,
  query,
  setQuery,
  categories,
  activeCategory,
  setActiveCategory,
  chooseTemplate,
}: {
  templates: PromptTemplate[];
  allTemplates: PromptTemplate[];
  selectedId: string;
  query: string;
  setQuery: (value: string) => void;
  categories: string[];
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  chooseTemplate: ChooseTemplate;
}) {
  return (
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
        <span>
          <Icon name="search" />
        </span>
        <input
          className="min-w-0 w-full border-0 bg-transparent text-[12px] text-[#2c2926] outline-none placeholder:text-[#a8a198]"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
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
                ? allTemplates.length
                : allTemplates.filter((template) => template.categories.includes(category)).length}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-[5px] max-[720px]:flex max-[720px]:overflow-x-auto max-[720px]:pb-1">
        {templates.map((template) => (
          <button
            type="button"
            className={`relative flex w-full items-start gap-[11px] rounded-[7px] border p-[11px_10px] text-left ${selectedId === template.id ? "border-[#e7b4a4] bg-[#fffaf6]" : "border-transparent bg-transparent hover:bg-[#f1ede7]"} max-[720px]:min-w-[220px]`}
            key={template.id}
            onClick={() => chooseTemplate(template)}
          >
            <span className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-[6px] bg-[#eee9f7] font-mono text-[12px] font-medium text-[#6e5b91]">
              <Icon name={template.icon} />
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
        {templates.length === 0 && (
          <p className="p-3 text-[12px] text-[#807a73]">No prompts match that search.</p>
        )}
      </div>
    </aside>
  );
}
