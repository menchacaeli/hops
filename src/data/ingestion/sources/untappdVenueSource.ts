import { makeBreweryId } from '../id';
import { normalizeBrewery } from '../normalize';
import {
  bestMatchVenueUrl,
  extractUntappdBeers,
  extractUntappdVenueResults,
} from '../parsers/untappd';
import type { SourcedBeerRecord, SourcedBreweryRecord, SourceFetchContext } from './types';

const UNTAPPD_BASE = 'https://untappd.com';
const SCRAPER_HEADERS = {
  'User-Agent': 'hops-expo-ingestion-bot/1.0 (+https://github.com)',
};

export async function fetchUntappdBeersForBrewery(
  record: SourcedBreweryRecord,
  fetcher: SourceFetchContext['fetcher'],
): Promise<SourcedBeerRecord[]> {
  const name = record.brewery.name;
  try {
    const searchUrl = `${UNTAPPD_BASE}/search?q=${encodeURIComponent(name)}`;
    const searchRes = await fetcher(searchUrl, { headers: SCRAPER_HEADERS });
    console.log(`[untappd] search "${name}" → HTTP ${searchRes.status}`);
    if (!searchRes.ok) return [];

    const searchHtml = await searchRes.text();
    const venues = extractUntappdVenueResults(searchHtml);
    console.log(`[untappd] "${name}" → ${venues.length} venue(s) found:`, venues.map(v => v.name ?? v.path));

    const venueUrl = bestMatchVenueUrl(venues, name);
    console.log(`[untappd] "${name}" → best match:`, venueUrl ?? 'none');
    if (!venueUrl) return [];

    const venueRes = await fetcher(venueUrl, { headers: SCRAPER_HEADERS });
    console.log(`[untappd] venue page "${venueUrl}" → HTTP ${venueRes.status}`);
    if (!venueRes.ok) return [];

    const venueHtml = await venueRes.text();
    const normalized = normalizeBrewery(record.brewery);
    const breweryId = makeBreweryId(normalized.name, record.brewery.city);
    const beers = extractUntappdBeers(venueHtml, breweryId, venueUrl);
    console.log(`[untappd] "${name}" → ${beers.length} beer(s) extracted`);
    return beers;
  } catch (err) {
    console.log(`[untappd] "${name}" → error:`, err instanceof Error ? err.message : String(err));
    return [];
  }
}
