"use client";

import Image from "next/image";
import { useState, type RefObject } from "react";
import { Button, FOCUS_RING_CLASSES } from "@/components/button";
import { IconClose, IconMug } from "@/components/icons";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { useCart } from "@/components/cart/cart-provider";

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function CartDialog({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement | null> }) {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function close() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  function handlePlaceOrder() {
    setSubmitted(true);
  }

  // Fires on every close path (Esc, backdrop click, the close button, or a
  // placed order) — only clear the cart once an order was actually placed.
  function handleDialogClose() {
    if (submitted) clear();
    setSubmitted(false);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleDialogClose}
      className="m-auto w-full max-w-md rounded-lg bg-surface p-8 shadow-lift backdrop:bg-espresso-950/50"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {submitted ? "Order received" : "Your order"}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-fast ease-brew hover:bg-cream-200 hover:text-ink ${FOCUS_RING_CLASSES}`}
        >
          <IconClose className="size-4" />
        </button>
      </div>

      {submitted ? (
        <div className="flex flex-col gap-6">
          <p className="text-sm text-ink-muted">
            This is a preview of the site, so nothing&rsquo;s been sent to the kitchen yet — when we&rsquo;re live, this is where your order would go out.
          </p>
          <Button type="button" variant="secondary" onClick={close} className="self-end">
            Close
          </Button>
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-muted">Your order&rsquo;s empty. Add something from the menu.</p>
      ) : (
        <div className="flex flex-col gap-5">
          <ul className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-1">
            {items.map((line) => (
              <li key={line.name} className="flex items-center gap-3">
                {line.image ? (
                  <Image
                    src={line.image}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                    <IconMug className="size-6" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{line.name}</p>
                  <p className="font-mono text-xs text-ink-muted">{formatPrice(line.price)}</p>
                </div>
                <QuantityStepper
                  label={line.name}
                  value={line.quantity}
                  min={1}
                  max={20}
                  onChange={(next) => updateQuantity(line.name, next)}
                />
                <button
                  type="button"
                  aria-label={`Remove ${line.name} from order`}
                  onClick={() => removeItem(line.name)}
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors duration-fast ease-brew hover:bg-cream-200 hover:text-ink ${FOCUS_RING_CLASSES}`}
                >
                  <IconClose className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t-2 border-dashed border-espresso-950/15 pt-4">
            <span className="font-mono text-xs uppercase tracking-ticket text-ink-muted">Subtotal</span>
            <span className="font-mono text-base font-bold text-ember-600">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={close}>
              Keep browsing
            </Button>
            <Button type="button" variant="primary" onClick={handlePlaceOrder}>
              Place order
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
