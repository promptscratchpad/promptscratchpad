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

export function Icon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px] fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
