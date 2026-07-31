import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FounderStory } from "@/components/about/founder-story";
import { ValuesStrip } from "@/components/about/values-strip";
import { CraftGallery } from "@/components/about/craft-gallery";
import { LinkButton, BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES } from "@/components/button";
import { ReserveButton } from "@/components/reservation/reserve-button";

export const metadata: Metadata = {
  title: "About — Brew & Co.",
  description: "The story behind Brew & Co. — a neighborhood coffee shop in Brooklyn.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A neighborhood shop, still run by the people who opened it"
      />
      <FounderStory />
      <ValuesStrip />
      <CraftGallery />

      <section className="border-t border-border bg-surface px-gutter py-section-y lg:px-gutter-lg">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Come see us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-muted">
            Grab a table, browse the menu, or just say hello at the counter.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ReserveButton className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES.primary}`}>
              Reserve a table
            </ReserveButton>
            <LinkButton href="/menu" variant="secondary">
              See the menu
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
