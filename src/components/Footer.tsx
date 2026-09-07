import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="flex justify-between border-t border-[#dfdbd4] px-[42px] py-[21px] text-[10px] text-[#9b938a] max-[720px]:flex-col max-[720px]:gap-3 max-[720px]:p-[18px]">
      <span>Made for curious people and better prompts.</span>
      <a
        className="flex items-center gap-1.5 text-[#bd4d2e]"
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
      >
        Suggest an improvement <Icon name="square-arrow-out-up-right" />
      </a>
    </footer>
  );
}
