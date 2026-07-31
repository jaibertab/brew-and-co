import Image from "next/image";

const GALLERY_IMAGES = [
  { src: "/images/about/interior.webp", alt: "The Brew & Co. dining room, with a wooden counter and bar seating" },
  { src: "/images/about/roasting.webp", alt: "Coffee beans mid-roast, steam rising from the roaster" },
  { src: "/images/about/pastry-case.webp", alt: "The pastry case, stocked with the morning's baking" },
];

export function CraftGallery() {
  return (
    <section className="px-gutter py-section-y lg:px-gutter-lg">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {GALLERY_IMAGES.map((image) => (
            <div key={image.src} className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
