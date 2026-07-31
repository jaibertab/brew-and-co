import Image from "next/image";
import { SteamLine } from "@/components/steam-line";

export function FounderStory() {
  return (
    <section className="px-gutter py-section-y lg:px-gutter-lg">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lift lg:sticky lg:top-28">
          <Image
            src="/images/about/latte-pour.webp"
            alt="A barista pouring steamed milk into a cup at the Brew & Co. counter"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-ticket text-ember-600">Our story</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Two shifts, one broken espresso machine
          </h2>
          <SteamLine className="my-6" />
          <div className="flex flex-col gap-4 text-lg text-ink-muted">
            <p>
              Brew &amp; Co. started as an argument about a coffee machine. In 2016, Elena Vasquez and Marcus Webb were both working the register at a diner on Nostrand Avenue — Elena on the early shift, Marcus closing. They didn&rsquo;t actually meet in person for almost a year. They just kept leaving each other notes taped to a broken espresso machine nobody had gotten around to fixing. Marcus wanted to junk it. Elena wanted to save it.
            </p>
            <p>She won.</p>
            <p>
              That machine — patched, re-gasketed, and still a little temperamental — is the reason there&rsquo;s a real espresso bar here instead of a diner counter. Elena had spent three summers in her uncle&rsquo;s caf&eacute; in Bogot&aacute;, learning to pull shots before she learned to drive. Marcus had spent a decade in restaurant kitchens, and knew better than most how much a regular wants to feel like someone remembers their order.
            </p>
            <p>
              They opened the doors on a quiet block in 2018 with four tables, a secondhand roaster, and a lease they could barely afford. The plan was simple: treat a $3 coffee with the same care as anything else on the menu, source from people they&rsquo;d actually met, and build a room people wanted to sit in for longer than it takes to pay.
            </p>
            <p>
              Eight years later, the machine&rsquo;s still here — right behind the counter, next to a photo of Marcus&rsquo;s grandmother. Her cinnamon roll recipe is the one on our menu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
