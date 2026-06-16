import type { SourcedBeerRecord } from '../sources/types';

type VenueResult = {
  path: string;
  name: string;
};

function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractUntappdVenueResults(html: string): VenueResult[] {
  const results: VenueResult[] = [];
  const seen = new Set<string>();
  const linkRegex = /href="(\/v\/[\w-]+\/\d+)"[^>]*>\s*([^<]{2,100})\s*<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(html)) !== null) {
    const path = match[1];
    const name = match[2].trim();
    if (seen.has(path) || !name) continue;
    seen.add(path);
    results.push({ path, name });
  }

  return results;
}

export function bestMatchVenueUrl(
  results: VenueResult[],
  breweryName: string,
): string | null {
  if (results.length === 0) return null;

  const target = normalizeName(breweryName);

  const exact = results.find(r => normalizeName(r.name) === target);
  if (exact) return `https://untappd.com${exact.path}`;

  const partial = results.find(r => {
    const n = normalizeName(r.name);
    return n.includes(target) || target.includes(n);
  });
  if (partial) return `https://untappd.com${partial.path}`;

  return null;
}

export function extractUntappdBeers(
  html: string,
  breweryId: string,
  sourceUrl: string,
): SourcedBeerRecord[] {
  const beers: SourcedBeerRecord[] = [];
  const seen = new Set<string>();
  const beerLinkRegex = /href="\/b\/([\w-]+)\/\d+"[^>]*>\s*([^<]{2,100})\s*<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = beerLinkRegex.exec(html)) !== null) {
    const name = match[2].trim();
    if (seen.has(name)) continue;
    seen.add(name);

    const contextStart = Math.max(0, match.index - 100);
    const context = html.slice(contextStart, match.index + 600);

    const abvMatch = /(\d+\.?\d*)\s*%\s*(?:ABV|abv)/.exec(context);
    const abv = abvMatch ? parseFloat(abvMatch[1]) : undefined;

    const imgMatch = /<img[^>]+src="(https?:\/\/[^"]+)"/.exec(context);
    const image = imgMatch ? imgMatch[1] : undefined;

    beers.push({
      beer: { breweryId, name, abv, image },
      provenance: { sourceId: 'untappd-venue', sourceUrl },
    });
  }

  return beers;
}
