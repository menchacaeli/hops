import type { SourcedBeerRecord } from '../sources/types';

type JsonLdValue = Record<string, unknown>;

function parseObject(value: string): JsonLdValue | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as JsonLdValue)
      : null;
  } catch {
    return null;
  }
}

export function extractJsonLdBlocks(html: string): JsonLdValue[] {
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks: JsonLdValue[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const raw = match[1]?.trim();
    if (!raw) continue;

    const parsed = parseObject(raw);
    if (parsed) {
      blocks.push(parsed);
      continue;
    }

    try {
      const parsedArray = JSON.parse(raw) as unknown;
      if (Array.isArray(parsedArray)) {
        parsedArray.forEach(item => {
          if (item && typeof item === 'object') {
            blocks.push(item as JsonLdValue);
          }
        });
      }
    } catch {
      // Best-effort parser: ignore malformed blocks.
    }
  }

  return blocks;
}

export function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function absolutizeUrl(maybeRelative: string, baseUrl: string): string {
  try {
    return new URL(maybeRelative, baseUrl).toString();
  } catch {
    return maybeRelative;
  }
}

// Converts HTML to text while preserving line breaks at block element boundaries.
function htmlToLines(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|div|li|h[1-6]|tr|td|th|section|article)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const SKIP_SEGMENT_RE =
  /^(home|about|contact|menu|visit|hours|location|find us|tap list|beers?|our beers?|on tap|current|available|seasonal|year.?round|copyright|all rights|privacy|terms|sign up|subscribe|newsletter|follow us|social|facebook|instagram|twitter|untappd|powered by|back to top|\d+)$/i;

function pickBeerNameBefore(text: string): string | null {
  const segments = text.split(/[\n\r|•·\/\\]+/).map(s => s.trim()).filter(Boolean);
  for (let i = segments.length - 1; i >= 0; i--) {
    const seg = segments[i];
    if (seg.length < 2 || seg.length > 60) continue;
    if (SKIP_SEGMENT_RE.test(seg)) continue;
    if (!/[a-zA-Z]/.test(seg)) continue;
    // Skip sentences (period not at end, or multiple words with a period mid-string)
    if (/\w\.\s+\w/.test(seg)) continue;
    // Skip if too many words (descriptions, not names)
    if (seg.split(/\s+/).length > 7) continue;
    return seg;
  }
  return null;
}

// Matches "7.2% ABV" and "ABV: 7.2%" and "ABV 7.2%"
const ABV_RE = /(?:(\d+\.?\d*)\s*%\s*(?:ABV|abv)|(?:ABV|abv)\s*:?\s*(\d+\.?\d*)\s*%)/g;

export function extractBeersFromAbvPatterns(
  html: string,
  breweryId: string,
  sourceUrl: string,
): SourcedBeerRecord[] {
  const beers: SourcedBeerRecord[] = [];
  const seen = new Set<string>();
  const text = htmlToLines(html);

  let match: RegExpExecArray | null;
  ABV_RE.lastIndex = 0;

  while ((match = ABV_RE.exec(text)) !== null) {
    const abv = parseFloat(match[1] ?? match[2]);
    if (!Number.isFinite(abv) || abv < 0.5 || abv > 20) continue;

    const before = text.slice(Math.max(0, match.index - 300), match.index);
    const name = pickBeerNameBefore(before);
    if (!name) continue;

    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    beers.push({
      beer: { breweryId, name, abv },
      provenance: { sourceId: 'brewery-website-abv', sourceUrl },
    });
  }

  return beers;
}

const BEER_PAGE_RE = /\b(beers?|taps?|brews?|tap.?room|taproom|drafts?|on.?tap|our.?beers?|what.?s.?on.?tap)\b/i;

export function extractBeerPageLinks(html: string, baseUrl: string): string[] {
  const linkRegex = /<a[^>]+href="([^"#][^"]*)"[^>]*>([^<]*)<\/a>/gi;
  const links: string[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;

  let base: URL;
  try {
    base = new URL(baseUrl);
  } catch {
    return [];
  }

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].trim();
    const text = match[2].trim();
    if (!BEER_PAGE_RE.test(href) && !BEER_PAGE_RE.test(text)) continue;

    const absolute = absolutizeUrl(href, baseUrl);
    try {
      const abs = new URL(absolute);
      if (abs.hostname !== base.hostname) continue;
    } catch {
      continue;
    }

    if (!seen.has(absolute)) {
      seen.add(absolute);
      links.push(absolute);
    }
  }

  return links.slice(0, 3);
}
