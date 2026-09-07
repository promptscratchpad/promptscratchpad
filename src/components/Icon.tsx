import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export function Icon({ name }: { name: string }) {
  return (
    <DynamicIcon
      name={name as IconName}
      aria-hidden="true"
      focusable="false"
      className="h-[15px] w-[15px]"
      strokeWidth={1.8}
      fallback={() => null}
    />
  );
}
