# Brew & Co. — Design System

Everything needed to build UI for this site consistently. Start here.

| File | What it's for |
|---|---|
| [`style-guide.md`](./style-guide.md) | Brand principles, color/type/motion reasoning, voice & copy rules. Read this first — it's the *why* behind every value in `tokens.css`. |
| [`tokens.css`](./tokens.css) | Canonical design tokens as a Tailwind v4 `@theme` block. Source of truth — wire this into the app (below). |
| [`tokens.json`](./tokens.json) | Portable mirror of the same values for non-Tailwind tools (Figma token plugins, design QA). If it ever disagrees with `tokens.css`, `tokens.css` wins. |
| [`components.md`](./components.md) | Implementation specs — anatomy, variants, states, Tailwind class recipes, and TSX sketches for each component. |
| [`style-guide.html`](./style-guide.html) | Living visual reference — open it in a browser to see every token and component rendered. Self-contained, no build step. |
| [`references/`](./references/) | Source inspiration (not the brand itself — see "Reference" in `style-guide.md` for how it was and wasn't used). |

## Wiring tokens into the app

Already done — `app/globals.css` and `app/layout.tsx` are wired. This section documents how, so the pattern is clear if a token or font ever needs to change.

`app/globals.css` imports the canonical tokens, then overrides the three font keys to point at the real self-hosted font variables:

```css
@import "tailwindcss";
@import "../docs/design/tokens.css";

@theme inline {
  --font-display: var(--font-fredoka);
  --font-sans: var(--font-jakarta);
  --font-mono: var(--font-space-mono);
}
```

`tokens.css` declares `--font-display` / `--font-sans` / `--font-mono` as literal fallback stacks (e.g. `"Fredoka", ui-rounded, sans-serif`) so it's still useful standalone. The `@theme inline` block in `app/globals.css` must come *after* the `tokens.css` import: Tailwind v4 resolves a theme key declared twice with "last wins," and `inline` makes the generated utility (e.g. `.font-sans`) reference `var(--font-jakarta)` directly rather than the intermediate `--font-sans` variable. This is the same pattern `create-next-app`'s default `globals.css` uses for Geist — verified against this repo's actual compiled CSS output, not assumed from general Tailwind v4 knowledge (this Next.js/Tailwind setup carries local breaking changes — see `AGENTS.md`).

`app/layout.tsx` loads the three fonts via `next/font/google` and sets those exact variable names on `<html>`:

```tsx
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });
```

Never link Google Fonts via `<link>` tags — this repo's Next.js docs (`node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`) specify `next/font` for self-hosting, and the build confirms `next/font` emits real `@font-face` rules backed by local `.woff2` files.

The app is fully rebuilt on the token system across all pages — `components/` holds the shared primitives (Button, Nav, Footer, ProductCard, CategoryBadge, the reservation dialog, etc.), each implementing the matching spec in `components.md`.

## Previewing `style-guide.html`

It's a static file — open it directly, or serve `docs/design/` with any static server (e.g. `npx serve docs/design`) if your browser blocks `file://` stylesheet/font loading.
