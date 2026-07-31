"use client";

import { useReservationDialog } from "@/components/reservation/reservation-provider";

// Deliberately unstyled: this is used in visually different contexts (a
// pill button in Nav/Hero, a plain text link in the dark Footer), so the
// caller supplies the full className rather than this component picking a
// default look that would need overriding half the time.
export function ReserveButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useReservationDialog();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
