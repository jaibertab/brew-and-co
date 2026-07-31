import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { MenuGrid } from "@/components/menu/menu-grid";

export const metadata: Metadata = {
  title: "Menu — Brew & Co.",
  description: "Espresso, drinks, pastries, sandwiches, and cold drinks — the full Brew & Co. menu.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Today's menu"
        title="What's brewing today"
        subhead="A short list, made fresh — ask at the counter if something's sold out."
      />
      <section className="border-t border-border bg-surface px-gutter pb-section-y lg:px-gutter-lg">
        <div className="mx-auto max-w-7xl pt-12">
          <MenuGrid />
        </div>
      </section>
    </>
  );
}
