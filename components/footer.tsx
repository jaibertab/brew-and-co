import Link from "next/link";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { FOCUS_RING_CLASSES } from "@/components/button";

export function Footer() {
  return (
    <footer id="site-footer" className="bg-espresso-950 px-gutter py-section-y text-cream-100 lg:px-gutter-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-2xl text-cream-50">Brew &amp; Co.</p>
          <p className="mt-2 max-w-xs text-sm text-cream-100/70">
            Small-batch coffee and bakery, made fresh every morning.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/menu" className={`rounded-sm text-sm text-cream-100/70 transition-colors duration-fast ease-brew hover:text-cream-50 ${FOCUS_RING_CLASSES}`}>
            Menu
          </Link>
          <Link href="/about" className={`rounded-sm text-sm text-cream-100/70 transition-colors duration-fast ease-brew hover:text-cream-50 ${FOCUS_RING_CLASSES}`}>
            About
          </Link>
          <ReserveButton className={`rounded-sm text-sm text-cream-100/70 transition-colors duration-fast ease-brew hover:text-cream-50 ${FOCUS_RING_CLASSES}`}>
            Reserve a table
          </ReserveButton>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl font-mono text-xs uppercase tracking-ticket text-cream-100/50">
        {`© ${new Date().getFullYear()} Brew & Co. — order fresh, every day`}
      </p>
    </footer>
  );
}
