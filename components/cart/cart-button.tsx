"use client";

import { FOCUS_RING_CLASSES } from "@/components/button";
import { IconCart } from "@/components/icons";
import { useCart } from "@/components/cart/cart-provider";

export function CartButton() {
  const { itemCount, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={itemCount > 0 ? `View order (${itemCount} item${itemCount === 1 ? "" : "s"})` : "View order"}
      className={`relative flex size-11 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-fast ease-brew hover:bg-cream-200 hover:text-ink ${FOCUS_RING_CLASSES}`}
    >
      <IconCart className="size-5" />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-ember-600 font-mono text-[0.65rem] font-bold text-cream-50">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
