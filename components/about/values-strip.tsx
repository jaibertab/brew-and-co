// Reframed from style-guide.md's own brand principles, so About-page copy
// stays traceable to the design system instead of inventing new language.
const VALUES = [
  {
    title: "Made by hand, every time",
    description: "Every espresso pulled to order, every pastry rolled that morning — nothing arrives pre-made.",
  },
  {
    title: "Every order gets our full attention",
    description: "A drip coffee gets the same care as anything else on the menu. There's no small order here.",
  },
  {
    title: "No gimmicks, just good coffee",
    description: "We tell you exactly what's in your cup — no marketing language standing in for the real thing.",
  },
];

export function ValuesStrip() {
  return (
    <section className="border-t border-border bg-surface px-gutter py-section-y lg:px-gutter-lg">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title}>
              <span aria-hidden="true" className="mb-4 block size-2 rounded-full bg-ember-500" />
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{value.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
