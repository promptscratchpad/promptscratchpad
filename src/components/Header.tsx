import { Icon } from "./Icon";
import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 py-[26px] ${isActive ? "border-[#e86d49] text-[#2c2926]" : "border-transparent hover:text-[#2c2926]"}`;

export function Header() {
  return (
    <header className="flex h-[76px] items-center gap-11 border-b border-[#dfdbd4] bg-[#fffdf9]/80 px-[42px]">
      <NavLink
        className="flex items-center gap-2.5 text-[19px] font-bold tracking-[-.7px]"
        to="/"
        aria-label="Prompt Foundry home"
      >
        <span className="grid h-[30px] w-[30px] rotate-[-6deg] place-items-center rounded-[9px] bg-[#e86d49] text-[17px] text-white">
          ✦
        </span>
        <span>
          Prompt<span className="text-[#e86d49]">Scratchpad</span>
        </span>
      </NavLink>
      <nav className="flex items-center gap-[30px] text-[13px] text-[#807a73] max-[720px]:hidden">
        <NavLink className={navLinkClass} to="/">
          Prompts
        </NavLink>
        <NavLink className={navLinkClass} to="/about">
          About
        </NavLink>
        <a
          className="flex items-center gap-[5px] border-b-2 border-transparent py-[26px] hover:text-[#2c2926]"
          href="https://github.com/promptscratchpad/templates"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <Icon name="square-arrow-out-up-right" />
        </a>
      </nav>
      <a
        className="flex gap-1 items-center ml-auto rounded-[7px] border border-[#d9d3cc] bg-transparent px-[15px] py-2.5 text-[12px] text-[#2c2926] hover:border-[#e86d49] hover:text-[#bd4d2e] max-[720px]:px-2.5 max-[720px]:py-2 max-[720px]:text-[10px]"
        href="https://github.com/promptscratchpad/templates"
        target="_blank"
        rel="noreferrer"
      >
        <p>Contribute a prompt</p>
        <Icon name="square-arrow-out-up-right" />
      </a>
    </header>
  );
}
