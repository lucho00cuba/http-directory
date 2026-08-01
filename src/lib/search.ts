import type { StatusEntry } from "@/lib/status";
import { CATEGORY_META, displayTitle } from "@/lib/status";

/** Strip markdown/HTML noise into plain searchable text. Build-time only. */
export function plainTextFromMarkdown(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~|>]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type SearchIndexItem = {
  href: string;
  title: string;
  code: string;
  category: string;
  /** Short fallback blurb (frontmatter description). */
  blurb: string;
  /** Plain document text (code + title + category + blurb + body). */
  text: string;
  /** Filled client-side once after parse — not serialized. */
  hay?: string;
};

export function buildSearchIndex(
  statuses: StatusEntry[],
  canonicalPath: (entry: StatusEntry) => string
): SearchIndexItem[] {
  return statuses.map((entry) => {
    const title = displayTitle(entry);
    const category = CATEGORY_META[entry.data.category].navLabel;
    const blurb = entry.data.description;
    const body = plainTextFromMarkdown(entry.body ?? "");
    const text = [String(entry.data.code), title, category, blurb, body]
      .filter(Boolean)
      .join(" ");
    return {
      href: canonicalPath(entry),
      title,
      code: String(entry.data.code),
      category,
      blurb,
      text,
    };
  });
}

function haystack(item: SearchIndexItem): string {
  return item.hay ?? (item.hay = item.text.toLowerCase());
}

/** Higher is better. 0 = no match. Multi-word queries require every term. */
export function scoreSearchItem(item: SearchIndexItem, q: string): number {
  const terms = q.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 0;
  const hay = haystack(item);
  if (!terms.every((t) => hay.includes(t))) return 0;

  const title = item.title.toLowerCase();
  const code = item.code;
  const cat = item.category.toLowerCase();
  const blurb = item.blurb.toLowerCase();

  if (terms.length === 1) {
    const t = terms[0];
    if (code === t) return 100;
    if (code.startsWith(t)) return 90;
  }
  if (title === q) return 85;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 70;
  if (terms.every((t) => title.includes(t))) return 65;
  if (cat.includes(q) || terms.every((t) => cat.includes(t))) return 45;
  if (blurb.includes(q) || terms.every((t) => blurb.includes(t))) return 35;
  if (hay.includes(q)) return 25;
  return 15;
}

/** Snippet around the first query hit; falls back to blurb. */
export function matchSnippet(
  item: SearchIndexItem,
  q: string,
  max = 96
): string {
  const terms = q.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return truncate(item.blurb, max);

  const hay = haystack(item);
  let best = -1;
  for (const term of terms) {
    const i = hay.indexOf(term);
    if (i !== -1 && (best === -1 || i < best)) best = i;
  }

  if (best === -1) return truncate(item.blurb, max);

  // Hit is still in the leading meta/blurb region — keep the curated description.
  const blurbStart = hay.indexOf(item.blurb.toLowerCase());
  if (
    blurbStart !== -1 &&
    best >= blurbStart &&
    best < blurbStart + item.blurb.length
  ) {
    return truncate(item.blurb, max);
  }
  if (best < 48) return truncate(item.blurb, max);

  const start = Math.max(0, best - 28);
  const end = Math.min(item.text.length, best + Math.max(q.length, 8) + 52);
  let snippet = item.text.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) snippet = `…${snippet}`;
  if (end < item.text.length) snippet = `${snippet}…`;
  return truncate(snippet, max);
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}
