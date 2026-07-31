# Brew & Co. — Component Specs

Implementation specs for the primitives the site is built from. Written against this repo's actual stack: **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**. Class names below assume `tokens.css` has been wired into `app/globals.css` (see [`README.md`](./README.md)) so utilities like `bg-cream-100`, `font-display`, `rounded-pill`, and `shadow-button` exist.

Read [`style-guide.md`](./style-guide.md) first for the reasoning behind colors/type/motion referenced here.

---

## 0. Fonts

Already wired in `app/layout.tsx` + `app/globals.css` — this section documents the pattern, verified against this repo's actual compiled CSS (not assumed, since this project's Next.js/Tailwind setup carries local breaking changes — see `AGENTS.md`).

`tokens.css` declares `--font-display` / `--font-sans` / `--font-mono` inside a plain `@theme` block with literal fallback stacks (`"Fredoka", ui-rounded, sans-serif`, etc.) — useful on its own, but not yet backed by real font files. `app/layout.tsx` loads the three families via `next/font/google` under **different** variable names, so they don't collide with the semantic token names:

```tsx
// app/layout.tsx
import { Fredoka, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${jakarta.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
```

`app/globals.css` then remaps the semantic keys onto those font variables, after importing `tokens.css`:

```css
@import "tailwindcss";
@import "../docs/design/tokens.css";

@theme inline {
  --font-display: var(--font-fredoka);
  --font-sans: var(--font-jakarta);
  --font-mono: var(--font-space-mono);
}
```

**Why this order matters:** Tailwind v4 resolves a theme key declared twice as "last wins." Declaring `--font-sans` again inside `@theme inline` after the `tokens.css` import overrides the literal fallback stack, and `inline` makes Tailwind generate `.font-sans { font-family: var(--font-jakarta) }` directly — bypassing the intermediate `--font-sans` variable rather than layering another `var()` indirection on top of it. This was confirmed against this project's actual compiled output, not inferred from Tailwind v3 mental models.

---

## 1. Button

**Anatomy:** label (+ optional leading/trailing icon in a circular chip, matching the reference's "Get Promo ▶" button).

**Variants:**

| Variant | Use | Classes |
|---|---|---|
| `primary` | The one action per screen you most want taken | `bg-ember-600 text-cream-50 hover:bg-ember-700 shadow-button` |
| `secondary` | Secondary action alongside a primary | `bg-transparent text-ink border border-border hover:bg-cream-200` |
| `ghost` | Low-emphasis inline action (nav, tertiary) | `bg-transparent text-ink-muted hover:text-ink` |

**Base recipe (all variants):**

```
inline-flex items-center gap-2 rounded-pill px-6 py-3
font-sans font-semibold text-base
transition-colors duration-fast ease-brew
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring
disabled:opacity-40 disabled:pointer-events-none
```

**Icon chip** (trailing circular accent, as in the reference's play-button): a `size-6 rounded-full bg-cream-50/20` circle containing a small icon, `ml-1`, only on `primary`.

```tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-ember-600 text-cream-50 hover:bg-ember-700 shadow-button",
    secondary: "bg-transparent text-ink border border-border hover:bg-cream-200",
    ghost: "bg-transparent text-ink-muted hover:text-ink",
  };
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-pill px-6 py-3 font-sans font-semibold text-base transition-colors duration-fast ease-brew focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**States:** default / hover (`duration-fast` color shift, no scale/transform) / focus-visible (2px `focus-ring` outline, 2px offset — keyboard only) / disabled (40% opacity, no pointer events, no separate disabled color).

---

## 2. Nav bar

**Anatomy:** wordmark (display font) — link group — "Reserve a table" trigger (opens the reservation dialog, §10).

```
Container: sticky top-0 z-40 bg-cream-100/95 backdrop-blur border-b border-border
Inner row: mx-auto max-w-7xl flex items-center justify-between gap-8 px-gutter lg:px-gutter-lg h-20
Wordmark: font-display text-2xl font-semibold text-ink tracking-tight
Link group: hidden md:flex items-center gap-8, each link:
  font-sans text-sm font-medium text-ink-muted tracking-wide hover:text-ink
  aria-current="page" link: text-ink border-b-2 border-ember-600 (no pill on nav links themselves)
```

The pill search field this section originally specified (§3) is **not currently used in Nav** — with a real, multi-page site there's no working search feature behind it yet, and a decorative dead input reads as broken. That slot is now the `Button` `secondary` variant, labeled "Reserve a table," opening the reservation dialog. Link group targets real routes (`/`, `/menu`, `/about`) with real `aria-current="page"` via `usePathname()`, not `#` anchors — this makes `Nav` a Client Component (`"use client"`).

---

## 3. Search input

Not currently wired into any page (see §2) — kept here as a ready-made spec for if/when a real menu-search feature is built, so it doesn't need to be redesigned from scratch later.

Matches the reference's rounded search pill:

```
flex items-center gap-2 rounded-pill bg-cream-50 border border-border
px-4 py-2.5 min-w-[14rem]
focus-within:border-ember-600 focus-within:ring-2 focus-within:ring-ember-600/20
```

Leading magnifier icon (`size-4 text-ink-faint`), then:

```tsx
<input
  type="search"
  placeholder="Search the menu"
  className="w-full bg-transparent font-sans text-sm text-ink placeholder:text-ink-faint outline-none"
/>
```

Always paired with a visually-hidden `<label>` — the placeholder is not a label substitute.

---

## 4. Category badge

The circular, colored icon-over-label stack from the reference, rebuilt on the brand's three **category** accents. Ember is deliberately excluded here — `style-guide.md` reserves ember for primary actions only ("Gold, pine, and berry identify menu categories — never actions"), so a category badge never uses it, no matter how many categories exist. Categories that need a shared tone (e.g. `espresso` and `drinks` both reading as "coffee counter, hot") just share one of the three rather than inventing a fourth color.

```tsx
type CategoryBadgeProps = {
  label: string;
  icon: React.ReactNode;
  tone: "gold" | "pine" | "berry";
};

const toneClasses: Record<CategoryBadgeProps["tone"], string> = {
  gold: "bg-gold-500 text-espresso-950",   // gold is light — dark icon required
  pine: "bg-pine-600 text-cream-50",
  berry: "bg-berry-500 text-cream-50",
};

export function CategoryBadge({ label, icon, tone }: CategoryBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={`flex size-14 items-center justify-center rounded-full shadow-soft ${toneClasses[tone]}`}
      >
        {icon}
      </span>
      <span className="font-mono text-xs uppercase tracking-ticket text-ink-muted">
        {label}
      </span>
    </div>
  );
}
```

Note the `gold` tone is the one case where icon color flips to dark ink instead of cream — see the contrast rule in `style-guide.md`. Label is always visible text, never icon-only (accessibility floor).

**Layout:** stack vertically alongside the hero image (as in the reference) on desktop; collapse to a horizontal scrollable row (`flex overflow-x-auto gap-6`) on mobile — don't shrink the circles below `size-12`.

---

## 5. Product card

Carries the signature ticket motif: dashed edge + monospace price. This is the real, shipped shape (full-bleed photo + description + optional badge tag + an order control), which carries more information than an early draft of this spec assumed — description matters on a real menu, don't strip it back to match a simpler mockup.

```
Container: flex flex-col gap-3 rounded-md bg-cream-50 p-5 shadow-soft
  border-b-2 border-dashed border-espresso-950/15   ← the "receipt tear"
Photo band: relative -mx-5 -mt-5 aspect-[4/3] overflow-hidden rounded-t-md
  (bleeds to the card's outer edge, undoing the container's own padding,
  so the photo reads as the card's dominant element, not a small accent)
  Photo: fill, object-cover
    (fallback: icon roundel filling the same band, tone-tinted, if no photo yet)
  Badge (optional): absolute right-3 top-3, rounded-sm bg-cream-50/90 px-2 py-1
    font-mono text-[0.65rem] uppercase tracking-ticket text-ink-muted shadow-soft
    — overlaid on the photo corner, e.g. "popular", "house favorite"
Name: font-sans text-base font-semibold text-ink
Description: font-sans text-sm text-ink-muted, directly under the name
Price: font-mono text-sm font-bold text-ember-600 tracking-tight, mt-auto
  (pinned to the bottom of the card so prices align across a row of cards
  with description text of different lengths)
Order control: flex items-center gap-2, directly under the price
  Quantity stepper (§5a), then a primary Button
  ("Add to order") filling the remaining width — stepper and button sit
  side by side, not stacked, so the whole control reads as one action.
```

```tsx
type ProductCardProps = {
  name: string;
  description: string;
  price: string; // pre-formatted, e.g. "$4.50"
  imageSrc?: string; // real photo when available
  fallback: { icon: React.ReactNode; toneClassName: string }; // icon roundel while photos are being sourced
  badge?: string;
};

export function ProductCard({ name, description, price, imageSrc, fallback, badge }: ProductCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-md border-b-2 border-dashed border-espresso-950/15 bg-cream-50 p-5 shadow-soft">
      <div className="relative -mx-5 -mt-5 aspect-[4/3] overflow-hidden rounded-t-md">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className={`flex h-full w-full items-center justify-center ${fallback.toneClassName}`}>
            {fallback.icon}
          </span>
        )}
        {badge && (
          <span className="absolute right-3 top-3 rounded-sm bg-cream-50/90 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-ticket text-ink-muted shadow-soft">
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="font-sans text-base font-semibold text-ink">{name}</p>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <p className="mt-auto pt-1 font-mono text-sm font-bold tracking-tight text-ember-600">{price}</p>
      {/* Order control: QuantityStepper + Button("Add to order"), see §5a */}
    </article>
  );
}
```

`alt=""` on the photo: the visible name text is the accessible description of the product (photo is reinforcement, not the sole source of meaning) — give it real alt text instead if a card is ever used without the visible name nearby.

---

## 5a. Quantity stepper & "Add to order" control

Sits directly under the price on a product card (§5), and is reused verbatim as the per-line quantity control inside the order dialog (§10 variant, listing cart lines).

```
Stepper: inline-flex items-center gap-1 rounded-pill border border-border bg-cream-50 p-1
  Decrease/increase: size-7 rounded-full text-ink-muted, hover:bg-cream-200 hover:text-ink,
    disabled:opacity-40 at min/max — icon-only (IconMinus/IconPlus), aria-label states the
    direction and names the product ("Decrease quantity of Cortado")
  Count: w-6 text-center font-mono text-sm text-ink, aria-live="polite" so screen readers
    announce the new count without needing to refocus
Order control row (on the product card): flex items-center gap-2, mt-3
  Stepper, then Button variant="primary" flex-1 justify-center px-4 py-2 text-sm
    label "Add to order" (flips briefly to "Added" on click, no layout shift)
  — side by side, never stacked: the stepper sets the quantity for the single
  click that follows, so they read as one control, not two decisions.
```

Quantity defaults to 1 and resets to 1 after adding — the stepper on the card is "how many to add next," not a running total (the running total lives in the order dialog, §10 variant).

---

## 6. Section heading

```
Eyebrow (optional): font-mono text-xs uppercase tracking-ticket text-ember-600 mb-2
Headline: font-display text-4xl md:text-5xl font-semibold text-ink tracking-tight leading-tight
Subhead (optional): font-sans text-lg text-ink-muted mt-3 max-w-xl
```

Eyebrows are ticket-style mono, always uppercase, always `ember-600` — reserve that combination for section eyebrows only, so it stays recognizable as a wayfinding pattern rather than generic emphasis.

---

## 7. Steam-line divider (signature accent)

A single hand-drawn stroke, used at most once per section — near a hero headline or between two sections, never as a repeating pattern.

```tsx
export function SteamLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      aria-hidden="true"
      className={`h-10 w-32 stroke-espresso-950/40 ${className ?? ""}`}
    >
      <path
        d="M4 36c10-6 10-14 0-20s-10-14 0-20 20 4 20 4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

`aria-hidden="true"` always — it's decorative. Keep stroke weight at 2px regardless of where it's placed; don't scale it up into a bold graphic element.

---

## 8. Tag / order-metadata label

Small mono chips for things like `ORDER #042`, `BREWED FRESH`, `SOLD OUT`:

```
inline-flex items-center rounded-sm bg-cream-200 px-2 py-1
font-mono text-xs uppercase tracking-ticket text-ink-muted
```

A `SOLD OUT` state swaps to `bg-espresso-950/8 text-ink-faint` and the parent product card drops to `opacity-60` with `pointer-events-none` on any add-to-order control — state is never conveyed by color change alone, the label text always changes too.

---

## 9. Footer

```
Container: bg-espresso-950 text-cream-100
Inner: mx-auto max-w-7xl px-gutter lg:px-gutter-lg py-section-y
Wordmark: font-display text-2xl text-cream-50
Body links: font-sans text-sm text-cream-100/70 hover:text-cream-50
Fine print: font-mono text-xs text-cream-100/50 tracking-ticket
```

This is the one surface in the system that inverts to dark (`espresso-950` background) — it should read as "closing the register" at the end of the page, a deliberate tonal shift, not a repeated section.

---

## 10. Dialog / modal

Used for the reservation flow. Built on the native `<dialog>` element, not a third-party library — this repo has no modal dependency installed, and native `<dialog>` gives ESC-to-close and focus trapping for free. **Backdrop-click-to-close is not automatic** — add an `onClick` on the `<dialog>` itself that checks `e.target === dialogRef.current` before closing, otherwise clicks inside the panel also close it.

```
<dialog>: rounded-lg bg-surface shadow-lift p-8 max-w-md w-full
  ::backdrop: bg-espresso-950/50
Header row: flex items-start justify-between gap-4 mb-6
  Title: font-display text-2xl font-semibold text-ink tracking-tight
  Close button: ghost icon button, size-8 rounded-full hover:bg-cream-200,
    aria-label="Close" (icon alone is never a sufficient accessible name)
Body: form fields (§11), gap-4 vertical stack
Footer: flex justify-end gap-3 mt-6 — Button secondary (Cancel) + Button primary (submit)
```

Opening/closing is imperative (`dialogRef.current.showModal()` / `.close()`), driven by React state or a shared context when more than one trigger needs to open the same dialog — don't duplicate the dialog per trigger. Motion: no entrance animation beyond what the browser's native `<dialog>`/`::backdrop` transition provides by default; don't add a custom scale/fade — see `style-guide.md` Motion on avoiding gratuitous animation.

---

## 11. Form field

Labeled text/number/date/time input, used inside the reservation dialog. No existing spec covered non-search inputs before this — search's pill shape (§3) is deliberately not reused here, since `tokens.css`'s own comment on `--radius-sm` names it for "input fields, tags," distinct from the pill shape reserved for buttons/search/nav.

```
Wrapper: flex flex-col gap-1.5
Label: font-sans text-sm font-medium text-ink
Input: rounded-sm border border-border bg-cream-50 px-4 py-2.5
  font-sans text-sm text-ink placeholder:text-ink-faint
  focus-visible:border-ember-600 focus-visible:ring-2 focus-visible:ring-ember-600/20
  outline-none
```

```tsx
type FormFieldProps = {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormField({ label, id, className, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-sm border border-border bg-cream-50 px-4 py-2.5 font-sans text-sm text-ink placeholder:text-ink-faint outline-none focus-visible:border-ember-600 focus-visible:ring-2 focus-visible:ring-ember-600/20 ${className ?? ""}`}
        {...props}
      />
    </div>
  );
}
```

A real, visible `<label>` every time — never a placeholder-only field, matching the same rule already established for the search input (§3).

---

## Accessibility checklist per component

- Every interactive element (`Button`, search input, nav links, form fields) has a visible `focus-visible` ring using `--color-focus-ring`.
- Color is never the only signal for state (sold out, active nav, category) — always paired with text or icon change.
- Decorative SVGs (`SteamLine`, illustration accents) carry `aria-hidden="true"`.
- Circular photo elements either have real `alt` text or sit next to a visible text label that serves as the description.
- Motion on any reveal/transition wraps in a `prefers-reduced-motion: reduce` check (see `style-guide.md` → Motion).
- Dialogs (§10) rely on native `<dialog>` for focus trapping and ESC-to-close — confirm those still work after any customization, and confirm focus returns to the trigger button on close. Close buttons always carry `aria-label="Close"`; icon alone is never a sufficient accessible name.
- Form fields (§11) always pair a real `<label for=...>` with its input — never placeholder-only.
