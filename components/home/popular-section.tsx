import { getMenuItems, getPopularItems } from "@/lib/menu";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";

export async function PopularSection() {
  const items = await getMenuItems();
  const popular = getPopularItems(items);

  return (
    <section className="px-gutter py-section-y lg:px-gutter-lg">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer favorites"
          title="What everyone orders"
          subhead="The six things people keep coming back for — see the full menu for everything else we're pouring and baking."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
