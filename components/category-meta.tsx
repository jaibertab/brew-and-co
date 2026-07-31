import { IconBread, IconCup, IconLeaf, IconMug, IconSandwich } from "@/components/icons";
import type { Tone } from "@/components/category-badge";

// Categories come from docs/design/menu-items.csv at runtime, so tone and
// icon are looked up here rather than hardcoded per item. Espresso/drinks
// share "gold" (hot, coffee-counter drinks) and pastries/sandwiches share
// "berry" (bakery/food) — only three tones exist on purpose, per
// style-guide.md's rule that ember is reserved for actions, never categories.
export const CATEGORY_TONE: Record<string, Tone> = {
  espresso: "gold",
  drinks: "gold",
  "cold drinks": "pine",
  pastries: "berry",
  sandwiches: "berry",
};

export const CATEGORY_ICON: Record<string, (props: { className?: string }) => React.ReactNode> = {
  espresso: IconMug,
  drinks: IconLeaf,
  "cold drinks": IconCup,
  pastries: IconBread,
  sandwiches: IconSandwich,
};

export function categoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function categorySlug(category: string): string {
  return category.replace(/\s+/g, "-");
}
