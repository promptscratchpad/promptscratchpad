import { Icon } from "./Icon";

export function PromptPreview({
  generatedPrompt,
  missingRequired,
  copied,
  copyPrompt,
}: {
  generatedPrompt: string;
  missingRequired: string[];
  copied: boolean;
  copyPrompt: () => void;
}) {
  return (
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
          Add {missingRequired.join(" and ")} to complete this prompt.
        </p>
      )}
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 rounded-[5px] border-0 bg-[#e86d49] px-3.5 py-2.5 text-[11px] font-semibold text-white hover:bg-[#bd4d2e] disabled:cursor-not-allowed disabled:opacity-45"
          onClick={copyPrompt}
          disabled={missingRequired.length > 0}
        >
          <Icon name={copied ? "check" : "copy"} /> {copied ? "Copied" : "Copy prompt"}
        </button>
        <span className="font-mono text-[10px] text-[#aaa29a]">
          {generatedPrompt.length} characters
        </span>
      </div>
      <div className="mt-[23px] flex items-center gap-[9px] rounded-[5px] bg-[#f3efe8] p-3 text-[#8c837a]">
        <span className="text-[14px] text-[#e86d49]">✦</span>
        <p className="m-0 text-[10px] leading-[1.5]">
          <strong className="font-semibold text-[#2c2926]">Tip</strong> Paste this into ChatGPT,
          Claude, Gemini, or any other AI assistant.
        </p>
      </div>
    </section>
  );
}
