# Brew & Co. — Style Guide

A cafe brand's website should feel like the counter, not a corporate menu board: warm, handmade, a little playful, fast to order from. This guide sets the point of view everything in `docs/design` is built from. See [`tokens.css`](./tokens.css) / [`tokens.json`](./tokens.json) for exact values and [`components.md`](./components.md) for implementation specs.

## Reference

`docs/design/references/1.png.webp` set the register we're working in: cream backgrounds, a bold rounded display headline, pill-shaped controls, and small circular category badges in different accent colors. Brew & Co. keeps that warmth but is its own brand, not a reskin — different palette, different type pairing, and a signature motif (below) the reference doesn't have.

## Brand principles

1. **Handmade, not manufactured.** Rounded corners, a hand-pulled display face, a hand-drawn steam line. Nothing razor-edged or corporate.
2. **The ticket is the receipt of care.** Every price, timestamp, and order number renders in monospace, like it came off a till printer. It's the one deliberately "systematic" note against all the roundness elsewhere, and it should always read as *evidence of a real order*, not decoration.
3. **One accent does the talking.** Ember (the CTA orange) is reserved for the single action you most want taken on a screen. Gold, pine, and berry identify categories (coffee, drinks/tea, bakery) — they label, they don't compete for the primary click.
4. **Say what the drink does, not what the brand is.** Copy describes the thing in front of the customer in plain, specific words. See Voice & copy below.

## Color

Full values live in `tokens.css`. In prose:

- **Cream** (`cream-50` → `cream-300`) is the paper the whole site sits on — warm off-white, never pure `#fff`.
- **Espresso** (`espresso-950` → `espresso-200`) is the ink — near-black brown for headlines, warm brown for body copy, never flat gray.
- **Ember** is the single primary accent: buttons, links, active nav state. Two steps exist on purpose — `ember-500` for decorative/large use (icons, illustration, big bold headline words) and `ember-600` for anything with text sitting on top of it (buttons), because `500` only clears WCAG AA at large-text sizes (3.7:1) while `600` clears it for normal text (5.0:1).
- **Gold / Pine / Berry** are category identifiers, one per menu section (Coffee / Drinks & Tea / Bakery). They appear as badge fills behind an icon, never as a page's primary action color. Gold is light enough that it needs **dark** (`espresso-950`) text or icon on top, never white — Pine and Berry are dark enough for white.

**Rule of thumb:** if it's a button people click to buy or continue, it's Ember-600. If it's a label identifying what kind of thing something is, it's Gold/Pine/Berry. If in doubt, check the contrast note next to the token in `tokens.css` before applying a color to text.

## Type

Three families, three jobs — never swap one in for another's role:

| Role | Family | Where |
|---|---|---|
| Display | **Fredoka** | Hero headline, section headlines, nav wordmark, big pull-quotes. Rounded and confident; used *sparingly* — it should never appear in a paragraph. |
| Body | **Plus Jakarta Sans** | Everything read at length: paragraphs, nav links, buttons, form labels. Humanist and warm without being a display face. |
| Ticket / mono | **Space Mono** | Prices, timestamps, order numbers, small uppercase eyebrow labels (tracked wide, e.g. `TODAY'S BREW`). This is the receipt-printer detail — see Signature motif. |

Load all three via `next/font/google` in `app/layout.tsx` (see `components.md` for the exact snippet) so they're self-hosted per Next.js convention — never a `<link>` to Google's CDN.

Display headlines set `tracking-tight` (`-0.02em`); mono ticket labels set `tracking-ticket` (`0.12em`) and uppercase. Body copy stays at normal tracking — Jakarta Sans doesn't need help.

## Signature motif: the ticket

The one element this site should be remembered by: **prices and order metadata rendered like a till receipt.**

- Prices set in `font-mono`, e.g. `$30.00`, right-aligned against the product name.
- Product cards and the cart/order summary get a dashed top or bottom edge (`border-width-ticket`, dashed, `espresso-950` at low opacity) — like a perforated receipt tear.
- A thin hand-drawn line accent (steam curling off a cup, reinterpreted from a single squiggle) appears near the hero headline and section dividers — one continuous stroke, never more than one per viewport, always `espresso-950` at ~40% opacity so it reads as pencil, not clip-art.
- Small uppercase mono labels (`ORDER #042`, `BREWED FRESH`) can appear near CTAs or product cards as a wink at the metaphor — use them where they're true (don't fabricate a fake order number on marketing copy that isn't an actual order).

Keep this motif to prices, order-adjacent metadata, and at most one line-art accent per section. It loses its charge if it's applied everywhere.

## Layout & spacing

- Base unit is 4px (Tailwind's default scale). Section rhythm uses the semantic tokens `--spacing-section-y` (80px) / `--spacing-section-y-lg` (120px) between major page sections, and `--spacing-gutter` / `--spacing-gutter-lg` for page margins — don't hand-pick arbitrary padding values for these.
- Hero and feature sections favor an asymmetric two-column split (copy + CTA on one side, product photography on the other) over centered, symmetric layouts — it's less generic and gives product photography room to bleed toward the edge.
- Category badges are circular, stacked vertically or in a horizontal row depending on viewport, never in a grid of squares.

## Radius

Pill-first: buttons, the search field, and nav pills use `radius-pill` (999px). Cards use `radius-md`/`radius-lg`. Product/category badges are full circles (`radius-full`, i.e. `rounded-full`). Nothing in the system uses a sharp 0px corner — that reads as the "broadsheet/editorial" register, which is a different brand than this one.

## Elevation

Shadows are tinted with `espresso-950`, never neutral black or gray (`shadow-soft`, `shadow-lift` in tokens). Buttons in their default Ember state get a faint ember-tinted glow (`shadow-button`) instead of a brown one — it's the one place the shadow color follows the accent instead of the ink.

## Motion

Motion is quiet and functional, not ambient decoration:

- Hover/press states use `duration-fast` (150ms) with `ease-brew`, a settle-in curve with no bounce — confident, not springy.
- Section reveals on scroll (if used) use `duration-slow` (400ms), and must respect `prefers-reduced-motion: reduce` — fall back to an instant, non-animated state.
- Avoid parallax, floating/bobbing idle animation, or particle effects — none of that fits a brand built around "a person made this by hand," which implies stillness and craft, not gimmicks.

## Imagery

Two distinct photography roles, governed differently — don't apply one's rules to the other:

- **Product / menu-item photography** (`ProductCard` photos on the Home and Menu pages): warm, high-contrast, shot on a plain surface or the cream/paper background itself so it drops in cleanly — not lifestyle photography with busy backgrounds.
- **Ambiance / hero photography** (the homepage hero, the About page): full-bleed, real-environment lifestyle photography is allowed here — shop interior, hands at work, steam, busy backgrounds included. Used sparingly (hero + About only, never on a menu card) and always paired with an ink-tinted (`espresso-950`) scrim or gradient beneath any overlaid text, never a neutral black scrim, so copy stays legible without fighting the brand's warm palette. Text sitting on this kind of photo switches to `cream-50`/`cream-100`, not the usual `ink`/`ink-muted` — the cream-page contrast rules don't apply once the background is a photo instead of `bg-background`.

Illustration accents (steam lines, the occasional hand-drawn flourish) are single-stroke and monochrome (`espresso-950` at reduced opacity), never full-color clip-art — they support the ticket/handmade motif rather than compete with real photography. They assume a cream/paper background to read against, so they don't appear on photo-backed sections (a dark stroke at 40% opacity disappears over a photo) — keep them to cream-background sections only.

## Voice & copy

- Name drinks and items the way a menu board does — plain, specific, a little sensory (*"Nutella Mudslide," "Caramel Frappuccino"*) — not marketing abstractions (*"Indulgent Experience"*).
- Buttons say the action, not a vague verb: **"Add to order"**, not "Submit." **"See the menu"**, not "Learn more."
- Prices are always exact and monospaced — never "starting at" language paired with an ambiguous number.
- Empty states (empty cart, no search results) speak plainly and offer the next step: *"Your order's empty. Add something from the menu."* — no apology, no forced whimsy.
- Errors state what happened and what to do, in the interface's voice: *"That item's sold out today — try the Caramel Frappuccino instead."*

## Accessibility floor

- All interactive elements get a visible focus ring using `--color-focus-ring` (`ember-600`) at 2px offset — never `outline: none` without a replacement.
- Text contrast follows the rules under Color above; when composing a new component, check the token comment in `tokens.css` before pairing a text color with a background.
- Motion respects `prefers-reduced-motion`.
- Circular category badges carry a text label (as in the reference), never rely on icon/color alone to convey which category is which.
