import { withBase } from "@/lib/site";
import type { CollectionEntry } from "astro:content";

export type StatusEntry = CollectionEntry<"status">;
export type StatusCategory = StatusEntry["data"]["category"];
export type AccentKey =
  "info" | "success" | "redirect" | "client-error" | "server-error";
export type CategoryIconName =
  "info" | "check" | "redirect" | "clientError" | "serverError";

export const CATEGORY_META: Record<
  StatusCategory,
  {
    label: string;
    range: string;
    name: string;
    blurb: string;
    accent: AccentKey;
    icon: CategoryIconName;
    id: string;
    navLabel: string;
  }
> = {
  informational: {
    label: "1xx",
    range: "1xx",
    name: "Informational",
    blurb: "Provisional responses sent before the final response.",
    accent: "info",
    icon: "info",
    id: "1xx",
    navLabel: "1xx Informational",
  },
  success: {
    label: "2xx",
    range: "2xx",
    name: "Success",
    blurb: "The request was successfully received, understood, and accepted.",
    accent: "success",
    icon: "check",
    id: "2xx",
    navLabel: "2xx Success",
  },
  redirection: {
    label: "3xx",
    range: "3xx",
    name: "Redirection",
    blurb: "Further action is needed to complete the request.",
    accent: "redirect",
    icon: "redirect",
    id: "3xx",
    navLabel: "3xx Redirection",
  },
  "client-error": {
    label: "4xx",
    range: "4xx",
    name: "Client Error",
    blurb: "The request contains bad syntax or cannot be fulfilled.",
    accent: "client-error",
    icon: "clientError",
    id: "4xx",
    navLabel: "4xx Client Error",
  },
  "server-error": {
    label: "5xx",
    range: "5xx",
    name: "Server Error",
    blurb: "The server failed to fulfill a valid request.",
    accent: "server-error",
    icon: "serverError",
    id: "5xx",
    navLabel: "5xx Server Error",
  },
};

export const ACCENT_CLASSES: Record<
  AccentKey,
  { text: string; bg: string; softBg: string; border: string }
> = {
  info: {
    text: "text-info",
    bg: "bg-info",
    softBg: "bg-info/10",
    border: "border-info",
  },
  success: {
    text: "text-success",
    bg: "bg-success",
    softBg: "bg-success/10",
    border: "border-success",
  },
  redirect: {
    text: "text-redirect",
    bg: "bg-redirect",
    softBg: "bg-redirect/10",
    border: "border-redirect",
  },
  "client-error": {
    text: "text-client-error",
    bg: "bg-client-error",
    softBg: "bg-client-error/10",
    border: "border-client-error",
  },
  "server-error": {
    text: "text-server-error",
    bg: "bg-server-error",
    softBg: "bg-server-error/10",
    border: "border-server-error",
  },
};

export const CATEGORY_ORDER: StatusCategory[] = [
  "informational",
  "success",
  "redirection",
  "client-error",
  "server-error",
];

export function displayTitle(entry: StatusEntry): string {
  return `${entry.data.code} ${entry.data.title}`;
}

export function tagline(entry: StatusEntry): string {
  const d = entry.data.description;
  if (d.length <= 72) return d;
  return `${d.slice(0, 69).trimEnd()}…`;
}

export function canonicalPath(entry: StatusEntry): string {
  return withBase(`status/${entry.data.slug}`);
}

export function shortPath(entry: StatusEntry): string {
  return withBase(`status/${entry.data.code}`);
}

export function pathsForStatus(entry: StatusEntry): string[] {
  return [String(entry.data.code), entry.data.slug];
}

export function sortStatuses(entries: StatusEntry[]): StatusEntry[] {
  return [...entries].sort((a, b) => a.data.code - b.data.code);
}

export function groupByCategory(entries: StatusEntry[]) {
  const sorted = sortStatuses(entries);
  return CATEGORY_ORDER.map((category) => ({
    category,
    meta: CATEGORY_META[category],
    entries: sorted.filter((e) => e.data.category === category),
  })).filter((g) => g.entries.length > 0);
}

export function formatUpdated(date: string | undefined): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function relatedInCategory(
  entry: StatusEntry,
  all: StatusEntry[],
  count = 2
) {
  return sortStatuses(all)
    .filter((e) => e.data.category === entry.data.category && e.id !== entry.id)
    .slice(0, count);
}

/** Short page lead from SEO description — drops the redundant “Learn what…” framing. */
export function pageLead(entry: StatusEntry): string {
  const { code, title, description, category } = entry.data;
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefix = new RegExp(
    `^Learn what the HTTP ${code} ${escapedTitle} status code means(?:\\s*,|\\s+and)?\\s*`,
    "i"
  );
  const rest = description.replace(prefix, "").trim();
  if (!rest) return CATEGORY_META[category].blurb;
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}
