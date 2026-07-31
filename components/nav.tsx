"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES, FOCUS_RING_CLASSES } from "@/components/button";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { CartButton } from "@/components/cart/cart-button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream-100/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-gutter lg:px-gutter-lg">
        <Link
          href="/"
          className={`rounded-sm font-display text-2xl font-semibold tracking-tight text-ink ${FOCUS_RING_CLASSES}`}
        >
          Brew &amp; Co.
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? `rounded-sm border-b-2 border-ember-600 pb-1 text-sm font-medium tracking-wide text-ink ${FOCUS_RING_CLASSES}`
                    : `rounded-sm text-sm font-medium tracking-wide text-ink-muted transition-colors duration-fast ease-brew hover:text-ink ${FOCUS_RING_CLASSES}`
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <ReserveButton className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES.secondary} px-5 py-2.5 text-sm`}>
            Reserve a table
          </ReserveButton>
        </div>
      </div>
    </header>
  );
}
