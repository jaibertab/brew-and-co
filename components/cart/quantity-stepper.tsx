"use client";

import { FOCUS_RING_CLASSES } from "@/components/button";
import { IconMinus, IconPlus } from "@/components/icons";

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = 20,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-pill border border-border bg-cream-50 p-1">
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-fast ease-brew hover:bg-cream-200 hover:text-ink disabled:opacity-40 disabled:pointer-events-none ${FOCUS_RING_CLASSES}`}
      >
        <IconMinus className="size-3.5" />
      </button>
      <span aria-live="polite" className="w-6 text-center font-mono text-sm text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-fast ease-brew hover:bg-cream-200 hover:text-ink disabled:opacity-40 disabled:pointer-events-none ${FOCUS_RING_CLASSES}`}
      >
        <IconPlus className="size-3.5" />
      </button>
    </div>
  );
}
