import Image from "next/image";
import Link from "next/link";
import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES } from "@/components/button";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { IconPlay } from "@/components/icons";

// Full-bleed ambiance photography with a text scrim — the one exception to
// the "plain surface, no busy backgrounds" product-photography rule, per
// the Imagery section in style-guide.md. Copy runs cream-on-dark here, not
// the usual ink/ink-muted, since the background is a photo, not bg-background.
export function Hero() {
  return (
    <section className="relative flex min-h-[42rem] items-end overflow-hidden px-gutter pb-16 pt-32 lg:min-h-[48rem] lg:px-gutter-lg lg:pb-24">
      <Image
        src="/images/hero/coffee-shop-counter.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/95 via-espresso-950/65 to-espresso-950/20" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-xl">
          <span className="mb-6 inline-flex items-center rounded-pill border border-cream-50/30 bg-cream-50/10 px-4 py-1.5 font-mono text-xs uppercase tracking-ticket text-cream-100 backdrop-blur">
            Brewed fresh, every morning
          </span>
          <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight text-cream-50 [text-shadow:0_2px_16px_rgb(36_18_9_/_0.7)] lg:text-6xl">
            Good mornings start with a good pour.
          </h1>
          <p className="mt-6 text-lg text-cream-100/85 [text-shadow:0_1px_8px_rgb(36_18_9_/_0.6)]">
            A cozy corner of the neighborhood for specialty coffee, fresh pastries, and light lunches — pull up a chair.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ReserveButton className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES.primary}`}>
              Reserve a table
              <span className="flex size-6 items-center justify-center rounded-full bg-cream-50/20">
                <IconPlay className="size-3" />
              </span>
            </ReserveButton>
            <Link
              href="/menu"
              className={`${BUTTON_BASE_CLASSES} border border-cream-50/40 text-cream-50 hover:bg-cream-50/10`}
            >
              See the menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
