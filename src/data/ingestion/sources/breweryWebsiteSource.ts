import { normalizeBrewery } from '../normalize';
import { makeBreweryId } from '../id';
import type { NormalizedBeerInput } from '../types';
import {
  absolutizeUrl,
  extractBeerPageLinks,
  extractBeersFromAbvPatterns,
  extractJsonLdBlocks,
  stripTags,
} from '../parsers/html';
import type {
  IngestionSourceAdapter,
  SourceFetchResult,
  SourcedBeerRecord,
  SourcedBreweryRecord,
  SourceFetchContext,
} from './types';

type BrewerySiteTarget = {
  brewery: SourcedBreweryRecord;
  websiteUrl: string;
};

const SCRAPER_HEADERS = {
  'User-Agent': 'hops-expo-ingestion-bot/1.0 (+https://github.com)',
};

function pickBeerImage(candidate: unknown, baseUrl: string): string {
  if (typeof candidate === 'string' && candidate.trim()) {
    return absolutizeUrl(candidate, baseUrl);
  }
  if (Array.isArray(candidate) && candidate.length > 0) {
    const first = candidate.find(item => typeof item === 'string');
    if (typeof first === 'string' && first.trim()) {
      return absolutizeUrl(first, baseUrl);
    }
  }
  return '';
}

function parseBeerProductsFromJsonLd(
  html: string,
  breweryId: string,
  sourceUrl: string,
): SourcedBeerRecord[] {
  const blocks = extractJsonLdBlocks(html);
  const beers: SourcedBeerRecord[] = [];

  blocks.forEach(block => {
    if (block['@type'] !== 'Product') return;
    const name = typeof block.name === 'string' ? block.name.trim() : '';
    if (!name) return;
    const description =
      typeof block.description === 'string' ? stripTags(block.description).slice(0, 500) : '';
    const beer: NormalizedBeerInput = {
      breweryId,
      name,
      description,
      image: pickBeerImage(block.image, sourceUrl),
    };
    beers.push({ beer, provenance: { sourceId: 'brewery-website-jsonld', sourceUrl } });
  });

  return beers;
}

async function fetchPageBeers(
  url: string,
  breweryId: string,
  fetcher: SourceFetchContext['fetcher'],
): Promise<SourcedBeerRecord[]> {
  const res = await fetcher(url, { headers: SCRAPER_HEADERS });
  if (!res.ok) return [];
  const html = await res.text();
  const jsonLd = parseBeerProductsFromJsonLd(html, breweryId, url);
  if (jsonLd.length > 0) return jsonLd;
  return extractBeersFromAbvPatterns(html, breweryId, url);
}

export async function fetchWebsiteBeersForBrewery(
  record: SourcedBreweryRecord,
  fetcher: SourceFetchContext['fetcher'],
): Promise<SourcedBeerRecord[]> {
  const name = record.brewery.name;
  if (!record.websiteUrl) {
    console.log(`[website] "${name}" → no website URL, skipping`);
    return [];
  }

  try {
    const response = await fetcher(record.websiteUrl, { headers: SCRAPER_HEADERS });
    console.log(`[website] "${name}" (${record.websiteUrl}) → HTTP ${response.status}`);
    if (!response.ok) return [];

    const html = await response.text();
    const normalized = normalizeBrewery(record.brewery);
    const breweryId = makeBreweryId(normalized.name, record.brewery.city);

    // Tier 1: JSON-LD Product structured data
    const jsonLdBeers = parseBeerProductsFromJsonLd(html, breweryId, record.websiteUrl);
    if (jsonLdBeers.length > 0) {
      console.log(`[website] "${name}" → ${jsonLdBeers.length} beer(s) via JSON-LD`);
      return jsonLdBeers;
    }

    // Tier 2: ABV patterns on the homepage itself
    const homepageBeers = extractBeersFromAbvPatterns(html, breweryId, record.websiteUrl);
    if (homepageBeers.length > 0) {
      console.log(`[website] "${name}" → ${homepageBeers.length} beer(s) via homepage ABV patterns`);
      return homepageBeers;
    }

    // Tier 3: Follow links to beer/tap/menu pages
    const beerLinks = extractBeerPageLinks(html, record.websiteUrl);
    console.log(`[website] "${name}" → following ${beerLinks.length} beer page link(s): ${beerLinks.join(', ')}`);

    for (const link of beerLinks) {
      const pageBeers = await fetchPageBeers(link, breweryId, fetcher);
      if (pageBeers.length > 0) {
        console.log(`[website] "${name}" → ${pageBeers.length} beer(s) via ${link}`);
        return pageBeers;
      }
    }

    console.log(`[website] "${name}" → 0 beers found`);
    return [];
  } catch (err) {
    console.log(`[website] "${name}" → error:`, err instanceof Error ? err.message : String(err));
    return [];
  }
}

export function createBreweryWebsiteSource(targets: BrewerySiteTarget[]): IngestionSourceAdapter {
  return {
    id: 'brewery-website-jsonld',
    async fetch({ fetcher }): Promise<SourceFetchResult> {
      const beerArrays = await Promise.all(
        targets.map(target => fetchWebsiteBeersForBrewery(target.brewery, fetcher)),
      );
      return { breweries: [], beers: beerArrays.flat() };
    },
  };
}
