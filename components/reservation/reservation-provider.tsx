"use client";

import { createContext, useContext, useRef } from "react";
import { ReservationDialog } from "@/components/reservation/reservation-dialog";

type ReservationContextValue = {
  open: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservationDialog() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error("useReservationDialog must be used within a ReservationProvider");
  }
  return ctx;
}

// Mounts a single <dialog> once so every trigger across the site (the nav
// pill, the hero CTA, the footer link) opens the same instance rather than
// each rendering its own dialog.
export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <ReservationContext.Provider value={{ open: () => dialogRef.current?.showModal() }}>
      {children}
      <ReservationDialog dialogRef={dialogRef} />
    </ReservationContext.Provider>
  );
}
