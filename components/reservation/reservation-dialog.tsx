"use client";

import { useRef, useState, type RefObject } from "react";
import { Button, FOCUS_RING_CLASSES } from "@/components/button";
import { IconClose } from "@/components/icons";
import { FormField } from "@/components/reservation/form-field";

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ReservationDialog({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function close() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  // Fires on every close path (Esc, backdrop click, the close button, or a
  // successful request) so the dialog always reopens as a fresh form.
  function handleDialogClose() {
    setSubmitted(false);
    formRef.current?.reset();
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
          {submitted ? "You're on the list" : "Reserve a table"}
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
            We&rsquo;ve got your request for this visit to the site. This is a preview of the site, so nothing&rsquo;s been sent to the shop yet — when we&rsquo;re live, we&rsquo;ll follow up to confirm your table.
          </p>
          <Button type="button" variant="secondary" onClick={close} className="self-end">
            Close
          </Button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField id="reservation-name" name="name" label="Name" type="text" autoComplete="name" required placeholder="Your name" />
          <FormField id="reservation-party-size" name="partySize" label="Party size" type="number" min={1} max={12} defaultValue={2} required />
          <FormField id="reservation-date" name="date" label="Preferred date" type="date" min={todayIsoDate()} required />
          <FormField id="reservation-time" name="time" label="Preferred time" type="time" required />
          <p className="font-mono text-xs uppercase tracking-ticket text-ink-faint">Open 7am–6pm daily</p>
          <div className="mt-2 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Request table
            </Button>
          </div>
        </form>
      )}
    </dialog>
  );
}
