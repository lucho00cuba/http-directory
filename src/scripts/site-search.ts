import { navigate } from "astro:transitions/client";
import {
  matchSnippet,
  scoreSearchItem,
  type SearchIndexItem,
} from "../lib/search";

let openBtn: HTMLButtonElement | null = null;
let dialog: HTMLElement | null = null;
let panel: HTMLElement | null = null;
let input: HTMLInputElement | null = null;
let resultsEl: HTMLElement | null = null;
let emptyEl: HTMLElement | null = null;
let hintEl: HTMLElement | null = null;
let footerEl: HTMLElement | null = null;
let indexNode: Element | null = null;

let items: SearchIndexItem[] = [];
let filtered: SearchIndexItem[] = [];
let activeIndex = -1;
let lastFocus: HTMLElement | null = null;
let lastQuery = "";
let isOpen = false;
let listenersBound = false;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseIndex(): SearchIndexItem[] {
  if (!indexNode?.textContent) return [];
  try {
    return JSON.parse(indexNode.textContent) as SearchIndexItem[];
  } catch {
    return [];
  }
}

function setModKey() {
  const mod = document.querySelector("[data-search-mod]");
  if (!mod) return;
  const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  mod.textContent = isApple ? "⌘" : "Ctrl";
}

function syncActiveDescendant() {
  if (!input) return;
  if (activeIndex < 0) {
    input.removeAttribute("aria-activedescendant");
    return;
  }
  input.setAttribute("aria-activedescendant", `site-search-hit-${activeIndex}`);
}

function renderResults() {
  if (!resultsEl || !emptyEl || !hintEl || !footerEl) return;

  const q = input?.value.trim() ?? "";

  if (!q) {
    resultsEl.innerHTML = "";
    emptyEl.hidden = true;
    hintEl.hidden = false;
    footerEl.hidden = true;
    syncActiveDescendant();
    return;
  }

  hintEl.hidden = true;

  if (filtered.length === 0) {
    resultsEl.innerHTML = "";
    emptyEl.hidden = false;
    footerEl.hidden = true;
    syncActiveDescendant();
    return;
  }

  emptyEl.hidden = true;
  footerEl.hidden = false;
  resultsEl.innerHTML = filtered
    .map((item, i) => {
      const active = i === activeIndex ? " is-active" : "";
      const snippet = matchSnippet(item, lastQuery);
      return `<a
    id="site-search-hit-${i}"
    class="search-hit${active}"
    href="${item.href}"
    role="option"
    data-search-hit
    data-index="${i}"
    aria-selected="${i === activeIndex}"
    tabindex="-1"
  >
    <span class="search-hit-main">
      <span class="search-hit-title">${escapeHtml(item.title)}</span>
      <span class="search-hit-cat">${escapeHtml(item.category)}</span>
    </span>
    <span class="search-hit-desc">${escapeHtml(snippet)}</span>
  </a>`;
    })
    .join("");
  syncActiveDescendant();
}

function applyQuery(raw: string) {
  const q = raw.trim().toLowerCase();
  lastQuery = q;
  if (!q) {
    filtered = [];
    activeIndex = -1;
    renderResults();
    return;
  }
  filtered = items
    .map((item) => ({ item, s: scoreSearchItem(item, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || Number(a.item.code) - Number(b.item.code))
    .slice(0, 12)
    .map((x) => x.item);
  activeIndex = filtered.length ? 0 : -1;
  renderResults();
}

function moveActive(delta: number) {
  if (filtered.length === 0) return;
  activeIndex = (activeIndex + delta + filtered.length) % filtered.length;
  renderResults();
  resultsEl
    ?.querySelector<HTMLElement>(`#site-search-hit-${activeIndex}`)
    ?.scrollIntoView({ block: "nearest" });
}

function goToActive() {
  if (activeIndex < 0 || !filtered[activeIndex]) return;
  const href = filtered[activeIndex].href;
  closeSearch();
  navigate(href);
}

function openSearch() {
  if (!dialog || !input || !openBtn || isOpen) return;
  lastFocus =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : openBtn;
  isOpen = true;
  dialog.hidden = false;
  openBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  applyQuery(input.value);
  requestAnimationFrame(() => {
    input?.focus();
    input?.select();
  });
}

function closeSearch() {
  if (!dialog || !openBtn || !isOpen) return;
  isOpen = false;
  dialog.hidden = true;
  openBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  const restore = lastFocus;
  lastFocus = null;
  if (restore && document.contains(restore)) restore.focus();
}

function cacheRefs() {
  openBtn = document.querySelector("[data-search-open]");
  dialog = document.querySelector("[data-search-dialog]");
  panel = document.querySelector("[data-search-panel]");
  input = document.querySelector("[data-search-input]");
  resultsEl = document.querySelector("[data-search-results]");
  emptyEl = document.querySelector("[data-search-empty]");
  hintEl = document.querySelector("[data-search-hint]");
  footerEl = document.querySelector("[data-search-footer]");
  indexNode = document.querySelector("[data-search-index]");
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (
    (event.key === "k" || event.key === "K") &&
    (event.metaKey || event.ctrlKey)
  ) {
    const tag = (event.target as HTMLElement | null)?.tagName;
    const inSearch =
      event.target === input || dialog?.contains(event.target as Node);
    if (
      !inSearch &&
      (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")
    )
      return;

    event.preventDefault();
    if (isOpen) closeSearch();
    else openSearch();
    return;
  }

  if (!isOpen) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeSearch();
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveActive(1);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveActive(-1);
    return;
  }

  if (event.key === "Enter" && event.target === input) {
    event.preventDefault();
    goToActive();
    return;
  }

  if (event.key === "Tab" && panel) {
    event.preventDefault();
    input?.focus();
  }
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("[data-search-open]")) {
    event.preventDefault();
    openSearch();
    return;
  }

  if (target.closest("[data-search-close]")) {
    event.preventDefault();
    closeSearch();
    return;
  }

  const hit = target.closest<HTMLAnchorElement>("[data-search-hit]");
  if (hit && dialog?.contains(hit)) {
    event.preventDefault();
    const href = hit.getAttribute("href");
    closeSearch();
    if (href) navigate(href);
  }
}

function onResultsPointerOver(event: Event) {
  if (!isOpen) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const hit = target.closest<HTMLElement>("[data-search-hit]");
  if (!hit || !resultsEl?.contains(hit)) return;
  const index = Number(hit.dataset.index);
  if (!Number.isInteger(index) || index === activeIndex) return;
  activeIndex = index;
  resultsEl.querySelectorAll<HTMLElement>("[data-search-hit]").forEach((el) => {
    const selected = Number(el.dataset.index) === activeIndex;
    el.classList.toggle("is-active", selected);
    el.setAttribute("aria-selected", String(selected));
  });
  syncActiveDescendant();
}

function onInput(event: Event) {
  if (event.target !== input || !input) return;
  applyQuery(input.value);
}

function bind() {
  cacheRefs();
  items = parseIndex();
  setModKey();
  if (isOpen) closeSearch();

  if (listenersBound) return;
  listenersBound = true;

  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocumentKeydown);
  document.addEventListener("input", onInput);
  document.addEventListener("pointerover", onResultsPointerOver);
  document.addEventListener("astro:before-preparation", () => {
    if (isOpen) closeSearch();
  });
}

document.addEventListener("astro:page-load", bind);
bind();
