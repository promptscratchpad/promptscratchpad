import type { PromptTemplate } from "../data/prompts";
import { FieldControl } from "./FieldControl";
import type { FormValues, UpdateField } from "./types";

export function PromptForm({
  template,
  values,
  updateField,
}: {
  template: PromptTemplate;
  values: FormValues;
  updateField: UpdateField;
}) {
  return (
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
            <h3 className="mb-[3px] mt-px text-[14px] font-semibold">Fill in the details</h3>
            <p className="m-0 text-[11px] text-[#807a73]">Give the prompt the context it needs.</p>
          </div>
        </div>
        <span className="font-mono text-[9px] text-[#aaa29a]">* Required</span>
      </div>
      <div className="grid gap-5 pt-6">
        {template.fields.map((field) => (
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
            {field.help && <small className="text-[10px] text-[#9b938a]">{field.help}</small>}
          </label>
        ))}
      </div>
    </form>
  );
}
