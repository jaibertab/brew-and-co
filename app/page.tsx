import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PopularSection } from "@/components/home/popular-section";
import { EventsSection } from "@/components/home/events-section";

// EventsSection computes "next occurrence" dates at render time; without a
// revalidate window this static page would freeze that computation at build
// time and silently show stale "upcoming" dates in production.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Brew & Co. — Coffee, pastries, and light lunches in Brooklyn",
  description:
    "A cozy neighborhood coffee shop specializing in specialty coffee, fresh pastries, and light lunches. Open mic Friday evenings, coffee tastings Saturday mornings.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <PopularSection />
      <EventsSection />
    </>
  );
}
