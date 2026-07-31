import { readFile } from "node:fs/promises";
import path from "node:path";

export type MenuItem = {
  category: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  image?: string;
};

const MENU_CSV_PATH = path.join(process.cwd(), "docs/design/menu-items.csv");

export async function getMenuItems(): Promise<MenuItem[]> {
  const csv = await readFile(MENU_CSV_PATH, "utf8");
  return parseMenuCsv(csv);
}

// Items with badge exactly "popular" — distinct from "house favorite", which
// is a separate, non-overlapping badge value in the CSV.
export function getPopularItems(items: MenuItem[]): MenuItem[] {
  return items.filter((item) => item.badge === "popular");
}

export function groupByCategory(items: MenuItem[]): Map<string, MenuItem[]> {
  const groups = new Map<string, MenuItem[]>();
  for (const item of items) {
    const group = groups.get(item.category) ?? [];
    group.push(item);
    groups.set(item.category, group);
  }
  return groups;
}

function parseMenuCsv(csv: string): MenuItem[] {
  const [headerLine, ...lines] = csv.trim().split(/\r?\n/);
  const headers = parseCsvRow(headerLine);

  return lines.map((line) => {
    const values = parseCsvRow(line);
    const row = Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ""]));
    return {
      category: row.category,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      badge: row.badge || undefined,
      image: row.image || undefined,
    };
  });
}

// Handles quoted fields (with embedded commas and "" escapes) — the CSV's
// own format, not a general-purpose RFC 4180 parser.
function parseCsvRow(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(field);
      field = "";
    } else {
      field += char;
    }
  }
  fields.push(field);
  return fields;
}
