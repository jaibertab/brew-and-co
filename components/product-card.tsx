import Image from "next/image";
import type { MenuItem } from "@/lib/menu";
import { IconMug } from "@/components/icons";
import { CATEGORY_ICON, CATEGORY_TONE } from "@/components/category-meta";
import type { Tone } from "@/components/category-badge";
import { AddToCart } from "@/components/menu/add-to-cart";

const FALLBACK_TONE_CLASSES: Record<Tone, string> = {
  gold: "bg-gold-500/15 text-gold-700",
  pine: "bg-pine-600/10 text-pine-700",
  berry: "bg-berry-500/12 text-berry-600",
};

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function ProductCard({ item }: { item: MenuItem }) {
  const tone = CATEGORY_TONE[item.category] ?? "gold";
  const Icon = CATEGORY_ICON[item.category] ?? IconMug;

  return (
    <article className="flex flex-col gap-3 rounded-md border-b-2 border-dashed border-espresso-950/15 bg-cream-50 p-5 shadow-soft">
      <div className="relative -mx-5 -mt-5 aspect-[4/3] overflow-hidden rounded-t-md">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className={`flex h-full w-full items-center justify-center ${FALLBACK_TONE_CLASSES[tone]}`}>
            <Icon className="size-12" />
          </span>
        )}
        {item.badge && (
          <span className="absolute right-3 top-3 rounded-sm bg-cream-50/90 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-ticket text-ink-muted shadow-soft">
            {item.badge}
          </span>
        )}
      </div>
      <div>
        <p className="font-sans text-base font-semibold text-ink">{item.name}</p>
        <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
      </div>
      <div className="mt-auto pt-1">
        <p className="font-mono text-sm font-bold tracking-tight text-ember-600">
          {formatPrice(item.price)}
        </p>
        <AddToCart name={item.name} price={item.price} image={item.image} />
      </div>
    </article>
  );
}
