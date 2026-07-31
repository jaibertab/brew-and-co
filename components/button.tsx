import Link from "next/link";
import type { ComponentProps } from "react";

export const BUTTON_VARIANT_CLASSES = {
  primary: "bg-ember-600 text-cream-50 hover:bg-ember-700 shadow-button",
  secondary: "bg-transparent text-ink border border-border hover:bg-cream-200",
  ghost: "bg-transparent text-ink-muted hover:text-ink",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANT_CLASSES;

// Shared by every custom interactive element (plain links, icon buttons)
// that doesn't otherwise build on BUTTON_BASE_CLASSES, so the branded ring
// from style-guide.md ("every interactive element gets a visible focus
// ring using --color-focus-ring") isn't hand-rolled — or forgotten — per call site.
export const FOCUS_RING_CLASSES =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

export const BUTTON_BASE_CLASSES = `inline-flex items-center gap-2 rounded-pill px-6 py-3 font-sans font-semibold text-base transition-colors duration-fast ease-brew ${FOCUS_RING_CLASSES} disabled:opacity-40 disabled:pointer-events-none`;

const VARIANT_CLASSES = BUTTON_VARIANT_CLASSES;
const BASE_CLASSES = BUTTON_BASE_CLASSES;

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  return (
    <button className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
} & ComponentProps<typeof Link>;

// Same visual treatment as Button, built on next/link for real client-side
// navigation (e.g. the hero's "See the menu" CTA) rather than an in-page action.
export function LinkButton({ variant = "primary", children, className, ...props }: LinkButtonProps) {
  return (
    <Link className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className ?? ""}`} {...props}>
      {children}
    </Link>
  );
}

export function ButtonIconChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-cream-50/20">
      {children}
    </span>
  );
}
