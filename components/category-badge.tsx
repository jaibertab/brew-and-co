import { FOCUS_RING_CLASSES } from "@/components/button";

export type Tone = "gold" | "pine" | "berry";

const TONE_CLASSES: Record<Tone, string> = {
  gold: "bg-gold-500 text-espresso-950", // gold is light — dark icon required
  pine: "bg-pine-600 text-cream-50",
  berry: "bg-berry-500 text-cream-50",
};

export function CategoryBadge({
  label,
  icon,
  tone,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  tone: Tone;
  href?: string;
}) {
  const content = (
    <>
      <span className={`flex size-14 items-center justify-center rounded-full shadow-soft ${TONE_CLASSES[tone]}`}>
        {icon}
      </span>
      <span className="font-mono text-xs uppercase tracking-ticket text-ink-muted">{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`flex shrink-0 flex-col items-center gap-2 rounded-sm ${FOCUS_RING_CLASSES}`}>
        {content}
      </a>
    );
  }

  return <div className="flex shrink-0 flex-col items-center gap-2">{content}</div>;
}
