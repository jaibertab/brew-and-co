export function SectionHeading({
  eyebrow,
  title,
  subhead,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
}) {
  return (
    <div>
      {eyebrow && <p className="font-mono text-xs uppercase tracking-ticket text-ember-600">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {subhead && <p className="mt-3 max-w-xl text-lg text-ink-muted">{subhead}</p>}
    </div>
  );
}
