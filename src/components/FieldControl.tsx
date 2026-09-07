import type { PromptField } from "../data/prompts";
import type { FieldValue } from "./types";
import { Icon } from "./Icon";

const inputClass =
  "w-full rounded-[5px] border border-[#dcd6cf] bg-white px-[11px] py-[10px] text-[12px] text-[#2c2926] outline-none placeholder:text-[#bbb3aa] focus:border-[#e49a83] focus:ring-4 focus:ring-[#e86d49]/10";
const choiceClass =
  "relative inline-flex min-h-[34px] cursor-pointer items-center gap-[7px] rounded-[5px] border border-[#e1dcd5] bg-white px-[10px] py-[7px] text-[11px] text-[#706a63] has-[:checked]:border-[#efa38d] has-[:checked]:bg-[#fff3ee] has-[:checked]:text-[#bd4d2e]";
const checkClass = "m-0 h-[13px] w-[13px] accent-[#e86d49]";

export function FieldControl({
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
        className={`${inputClass} min-h-[84px] resize-y leading-[1.5]`}
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholderText}
        rows={4}
      />
    );
  if (field.type === "number")
    return (
      <input
        className={inputClass}
        type="number"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholderText}
      />
    );
  if (field.type === "select")
    return (
      <select
        className={inputClass}
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
          <label className={choiceClass} key={option}>
            <input
              className={checkClass}
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
      <div className="flex flex-wrap gap-[7px]">
        {options.map((option) => (
          <label className={choiceClass} key={option}>
            <input
              className={checkClass}
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
        className="flex items-center gap-[9px] border-0 bg-transparent p-0 text-[11px] text-[#807a73]"
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
              className={`${inputClass} min-w-0 flex-1`}
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
              {<Icon name="x" />}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="flex w-max items-center gap-[5px] border-0 bg-transparent p-0 text-[10px] text-[#bd4d2e]"
          onClick={() => onChange([...items, ""])}
        >
          <Icon name="plus" /> Add item
        </button>
      </div>
    );
  }
  return (
    <input
      className={inputClass}
      value={String(value)}
      onChange={(event) => onChange(event.target.value)}
      placeholder={field.placeholderText}
    />
  );
}
