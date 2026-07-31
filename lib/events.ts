export type RecurringEvent = {
  slug: string;
  name: string;
  dayOfWeek: number; // Date.getDay() convention: 0 = Sunday .. 6 = Saturday
  timeLabel: string; // display only, not parsed — see getNextOccurrence note below
  description: string;
};

export const RECURRING_EVENTS: RecurringEvent[] = [
  {
    slug: "open-mic-night",
    name: "Open Mic Night",
    dayOfWeek: 5,
    timeLabel: "7:00 PM",
    description: "Grab a mic or grab a seat — our corner stage is open to anyone who wants it, every Friday evening.",
  },
  {
    slug: "coffee-tasting",
    name: "Coffee Tasting",
    dayOfWeek: 6,
    timeLabel: "10:00 AM",
    description: "A guided cupping through that week's beans — where they're from, how we roast them, and why they taste the way they do.",
  },
];

// Returns the next date (today included) that falls on the given weekday.
// Doesn't compare against timeLabel's clock time, so if today is the event's
// day, it's treated as "upcoming" even if that time has already passed today
// — timeLabel is a display string, not a parsed time, and handling that edge
// case isn't worth the complexity for a once-a-week display list.
export function getNextOccurrence(dayOfWeek: number, from: Date = new Date()): Date {
  const result = new Date(from);
  result.setDate(from.getDate() + ((dayOfWeek - from.getDay() + 7) % 7));
  return result;
}
