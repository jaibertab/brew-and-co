import { RECURRING_EVENTS, getNextOccurrence } from "@/lib/events";
import { SectionHeading } from "@/components/section-heading";

function formatEventDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function EventsSection() {
  return (
    <section className="border-t border-border bg-surface px-gutter py-section-y lg:px-gutter-lg">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Every week"
          title="Upcoming events"
          subhead="Standing plans, not one-offs — same time, every week."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {RECURRING_EVENTS.map((event) => {
            const nextDate = getNextOccurrence(event.dayOfWeek);
            return (
              <article
                key={event.slug}
                className="flex flex-col gap-3 rounded-lg border-b-2 border-dashed border-espresso-950/15 bg-cream-50 p-6 shadow-soft"
              >
                <p className="font-mono text-xs uppercase tracking-ticket text-ember-600">
                  {formatEventDate(nextDate)} &middot; {event.timeLabel}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{event.name}</h3>
                <p className="text-sm text-ink-muted">{event.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
