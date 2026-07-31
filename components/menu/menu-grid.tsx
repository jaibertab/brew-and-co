import { getMenuItems, groupByCategory } from "@/lib/menu";
import { ProductCard } from "@/components/product-card";
import { CategoryBadge } from "@/components/category-badge";
import { CATEGORY_ICON, CATEGORY_TONE, categoryLabel, categorySlug } from "@/components/category-meta";

export async function MenuGrid() {
  const items = await getMenuItems();
  const grouped = groupByCategory(items);
  const categories = [...grouped.keys()];

  return (
    <div>
      <nav aria-label="Menu categories" className="flex flex-wrap gap-8">
        {categories.map((category) => {
          const Icon = CATEGORY_ICON[category] ?? undefined;
          const tone = CATEGORY_TONE[category] ?? "gold";
          if (!Icon) return null;
          return (
            <CategoryBadge
              key={category}
              href={`#${categorySlug(category)}`}
              label={categoryLabel(category)}
              tone={tone}
              icon={<Icon className="size-6" />}
            />
          );
        })}
      </nav>

      <div className="mt-14 flex flex-col gap-14">
        {categories.map((category) => (
          <div key={category} id={categorySlug(category)} className="scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {categoryLabel(category)}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {grouped.get(category)!.map((item) => (
                <ProductCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
