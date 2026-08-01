/**
 * Site identity & SEO — single source of truth for brand, URLs, and social meta.
 * Update these values when renaming, rebranding, or changing the production host.
 */
export const site = {
  /** Full display name used in titles and copy */
  name: "HTTP_Directory",
  /** Split mark for UI: HTTP + _Directory */
  brand: {
    primary: "HTTP",
    secondary: "_Directory",
    mark: "{}",
  },
  /** Production origin (must match astro.config `site`) */
  origin: "https://http-directory.justme.ovh",
  /** Path prefix for deployment (must match astro.config `base`; `/` for custom domain at root) */
  base: "/",
  /** Public site URL */
  url: "https://http-directory.justme.ovh/",
  locale: "en_US",
  language: "en",
  tagline: "The HTTP status code directory",
  description:
    "A clean, technical reference for every HTTP status code: informational, success, redirection, client and server errors.",
  /** Shorter line for footers / compact UI */
  shortDescription: "Practical guides to every HTTP status code.",
  themeColor: "#fcf8f8",
  backgroundColor: "#fcf8f8",
  /** Brand ink used on icons / dark surfaces */
  brandColor: "#0b0f10",
  author: {
    name: "HTTP_Directory",
  },
  inspiration: {
    name: "HTTP Guides",
    url: "https://httpguides.com/",
    github: "https://github.com/jmstfv",
    handle: "@jmstfv",
  },
  owner: {
    name: "lucho00cuba",
    github: "https://github.com/lucho00cuba",
    repo: "https://github.com/lucho00cuba/http-directory",
  },
  assets: {
    faviconSvg: "/favicon.svg",
    faviconIco: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
    ogImage: "/og.png",
    manifest: "/site.webmanifest",
  },
  og: {
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: "HTTP_Directory — practical guides to HTTP status codes",
    twitterCard: "summary_large_image" as const,
  },
} as const;

/** Prefix an internal URL with Astro's configured deployment base. */
export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const basePath = base.replace(/^\/+|\/+$/g, "");
  const normalized = path.replace(/^\/+/, "");
  const relative =
    normalized === basePath
      ? ""
      : normalized.startsWith(`${basePath}/`)
        ? normalized.slice(basePath.length + 1)
        : normalized;
  return relative ? `${base}${relative}` : base;
}

export function absoluteUrl(path = ""): string {
  return new URL(withBase(path), site.origin).toString();
}

export function pageTitle(title?: string): string {
  if (!title || title === site.name) return site.name;
  return `${title} · ${site.name}`;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: "HTTP Directory",
    url: site.url,
    description: site.description,
    inLanguage: site.language,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: absoluteUrl(site.assets.appleTouchIcon),
    },
  };
}
