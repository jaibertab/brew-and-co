import { SectionHeading } from "@/components/section-heading";

// Lighter-weight top-of-page banner for About/Menu — same eyebrow/headline/
// subhead pattern as SectionHeading, just with the page-top spacing Hero
// otherwise provides on the homepage.
export function PageHeader({
  eyebrow,
  title,
  subhead,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
}) {
  return (
    <section className="px-gutter pb-section-y pt-16 lg:px-gutter-lg lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} />
      </div>
    </section>
  );
}
