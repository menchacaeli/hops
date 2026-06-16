import type { IngestionSourceAdapter, SourceFetchResult, SourcedBreweryRecord } from './types';

type OpenBreweryDbItem = {
  name?: string;
  city?: string;
  state?: string;
  street?: string;
  phone?: string;
  latitude?: string;
  longitude?: string;
  website_url?: string;
};

const OPEN_BREWERY_DB_URL =
  'https://api.openbrewerydb.org/v1/breweries?by_state=new_mexico&per_page=200';

function toNumber(value?: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function toBreweryRecord(item: OpenBreweryDbItem): SourcedBreweryRecord | null {
  if (!item.name || !item.city) return null;

  return {
    brewery: {
      name: item.name,
      city: item.city,
      address: item.street ?? `${item.city}, ${item.state ?? 'NM'}`,
      phone: item.phone,
      image: '',
      latitude: toNumber(item.latitude),
      longitude: toNumber(item.longitude),
    },
    websiteUrl: item.website_url ?? undefined,
    provenance: {
      sourceId: 'open-brewery-db',
      sourceUrl: OPEN_BREWERY_DB_URL,
    },
  };
}

export const openBreweryDbSource: IngestionSourceAdapter = {
  id: 'open-brewery-db',
  async fetch({ fetcher }): Promise<SourceFetchResult> {
    const response = await fetcher(OPEN_BREWERY_DB_URL);
    if (!response.ok) {
      throw new Error(`open-brewery-db fetch failed: ${response.status}`);
    }

    const payload = (await response.json()) as OpenBreweryDbItem[];
    const breweries = payload
      .map(toBreweryRecord)
      .filter((item): item is SourcedBreweryRecord => item !== null);

    return {
      breweries,
      beers: [],
    };
  },
};
