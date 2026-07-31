export function SteamLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      aria-hidden="true"
      className={`h-8 w-28 stroke-espresso-950/40 ${className}`}
    >
      <path d="M4 36c10-6 10-14 0-20s-10-14 0-20 20 4 20 4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
