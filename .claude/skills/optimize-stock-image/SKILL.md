---
name: optimize-stock-image
description: Downloads a stock photo (e.g. from Pexels) from a URL, resizes it for web use, converts it to webp, and saves it into public/images/ so the site serves it locally instead of hitting the external host at runtime. Use whenever the user wants to add, replace, or bulk-import stock photography for this app.
---

# Optimize stock image

Fetches an image from a URL, resizes it, converts it to webp, and writes it into `public/images/`. Backed by `scripts/optimize-image.mjs`, which uses `sharp` (already a devDependency).

## Before running

**Get the direct image file URL, not the page URL.** A Pexels page like `pexels.com/photo/espresso-served-in-a-restaurant-18604200/` is not fetchable — you need the actual `images.pexels.com/photos/.../pexels-photo-18604200.jpeg` link (visible in the page's "Free Download" link or image `src`). The script will error clearly if a URL doesn't return `image/*`.

**Decide the width from where the image is used**, don't guess:
- Full-bleed / hero backgrounds (`fill` + `sizes="100vw"`, like `components/home/hero.tsx`): width ~1920.
- Grid/gallery cards at a fraction of the viewport (e.g. `sizes="(min-width: 640px) 33vw, 100vw"`, like `components/about/craft-gallery.tsx`): width ~900–1000.
- Small menu/product cards: width ~800.
- If you're replacing an existing image, check the component that renders it (`grep -rn "images/<old-name>" components/ app/`) for its `sizes` prop and adjust accordingly.

Only pass `height` (which crops via `fit: cover`) when the destination has a fixed aspect ratio (e.g. a gallery square/portrait crop) and the source photo's aspect doesn't already match — cropping throws away pixels, so prefer width-only scaling when the CSS just needs `object-cover` on a flexible box.

## Single image

```
node .claude/skills/optimize-stock-image/scripts/optimize-image.mjs \
  --url "https://images.pexels.com/photos/18604200/pexels-photo-18604200.jpeg" \
  --out "menu/house-espresso" \
  --width 1200
```

- `--out` is a path relative to `public/images/`, without extension — the script always writes `.webp`.
- `--quality` defaults to 82 (good balance for photography; rarely needs changing).
- The script refuses to overwrite an existing file unless you pass `--force` — if you're intentionally replacing a curated image, add it.

## Multiple images (bulk import)

Write a manifest JSON array and pass `--manifest`, one job per image:

```json
[
  { "url": "https://images.pexels.com/photos/.../pexels-photo-1.jpeg", "out": "menu/cortado", "width": 800 },
  { "url": "https://images.pexels.com/photos/.../pexels-photo-2.jpeg", "out": "menu/cappuccino", "width": 800 }
]
```

```
node .claude/skills/optimize-stock-image/scripts/optimize-image.mjs --manifest /tmp/import.json
```

Write the manifest to the scratchpad/temp directory, not into the repo. Each job reports success/failure independently and the script exits non-zero if any job failed, so check the output for `FAILED` lines even if the command exits 0-looking mid-stream.

## After running

1. Wire the new path into the component: `src="/images/<out>.webp"` with `next/image`.
2. Update `public/images/CREDITS.md`, following its existing format (photographer name + Pexels source link per image, grouped by section). This project treats photo attribution as required bookkeeping even though the Pexels license doesn't mandate it.
3. Do not commit files that don't belong in git history unnecessarily large — webp output should already be small; if a single file is unexpectedly >500kB, re-run with a lower `--quality` or smaller `--width` rather than committing it as-is.
