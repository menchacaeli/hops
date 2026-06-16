import { normalizeBeer, normalizeBrewery } from './normalize';
import type { Beer, Brewery } from '../models';
import { fetchWebsiteBeersForBrewery } from './sources/breweryWebsiteSource';
import { openBreweryDbSource } from './sources/openBreweryDbSource';
import { fetchUntappdBeersForBrewery } from './sources/untappdVenueSource';
import type {
  IngestionSourceAdapter,
  SourceFetchContext,
  SourceRecordProvenance,
  SourcedBeerRecord,
  SourcedBreweryRecord,
} from './sources/types';
import type { CanonicalRecord, IngestionNormalizedBundle, IngestionProvenance } from './types';

type IngestionRunResult = {
  bundle: IngestionNormalizedBundle;
  breweryRecords: CanonicalRecord<Brewery>[];
  beerRecords: CanonicalRecord<Beer>[];
};

type RunIngestionOptions = {
  fetcher?: SourceFetchContext['fetcher'];
  sourceAdapters?: IngestionSourceAdapter[];
};

function makeContentHash(value: object): string {
  const raw = JSON.stringify(value);
  let hash = 5381;
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash * 33) ^ raw.charCodeAt(i);
  }
  return `h${(hash >>> 0).toString(16)}`;
}

function makeProvenance(source: SourceRecordProvenance, data: object): IngestionProvenance {
  return {
    sourceId: source.sourceId,
    sourceUrl: source.sourceUrl,
    lastSeenAt: new Date().toISOString(),
    contentHash: makeContentHash(data),
    confidenceScore: 0.8,
  };
}

function toCanonicalBrewery(record: SourcedBreweryRecord): CanonicalRecord<Brewery> {
  const data = normalizeBrewery(record.brewery);
  return {
    entityType: 'brewery',
    data,
    provenance: makeProvenance(record.provenance, data),
  };
}

function toCanonicalBeer(record: SourcedBeerRecord): CanonicalRecord<Beer> {
  const data = normalizeBeer(record.beer);
  return {
    entityType: 'beer',
    data,
    provenance: makeProvenance(record.provenance, data),
  };
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const map = new Map<string, T>();
  items.forEach(item => {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  });
  return [...map.values()];
}

async function fetchBeersForBrewery(
  record: SourcedBreweryRecord,
  fetcher: SourceFetchContext['fetcher'],
): Promise<SourcedBeerRecord[]> {
  const untappdBeers = await fetchUntappdBeersForBrewery(record, fetcher);
  if (untappdBeers.length > 0) {
    console.log(`[runner] "${record.brewery.name}" → ${untappdBeers.length} beer(s) from Untappd`);
    return untappdBeers;
  }
  const websiteBeers = await fetchWebsiteBeersForBrewery(record, fetcher);
  console.log(`[runner] "${record.brewery.name}" → ${websiteBeers.length} beer(s) from website fallback`);
  return websiteBeers;
}

export async function runIngestion(options: RunIngestionOptions = {}): Promise<IngestionRunResult> {
  const fetcher = options.fetcher ?? fetch;

  const baseSourceResult = await openBreweryDbSource.fetch({ fetcher });

  let extraBreweries: SourcedBreweryRecord[];
  let beersFromSources: SourcedBeerRecord[];

  if (options.sourceAdapters) {
    const sourceResults = await Promise.all(
      options.sourceAdapters.map(adapter => adapter.fetch({ fetcher })),
    );
    extraBreweries = sourceResults.flatMap(r => r.breweries);
    beersFromSources = sourceResults.flatMap(r => r.beers);
  } else {
    extraBreweries = [];
    const beerArrays = await Promise.all(
      baseSourceResult.breweries.map(record => fetchBeersForBrewery(record, fetcher)),
    );
    beersFromSources = beerArrays.flat();
  }

  const breweryRecords = [...baseSourceResult.breweries, ...extraBreweries].map(toCanonicalBrewery);
  const breweryIdSet = new Set(breweryRecords.map(record => record.data.id));

  const beerRecords = [...baseSourceResult.beers, ...beersFromSources]
    .map(toCanonicalBeer)
    .filter(record => breweryIdSet.has(record.data.breweryId));

  const bundle: IngestionNormalizedBundle = {
    breweries: dedupeById(breweryRecords.map(record => record.data)),
    beers: dedupeById(beerRecords.map(record => record.data)),
    events: [],
    foodTrucks: [],
    foodTruckStops: [],
  };

  return {
    bundle,
    breweryRecords,
    beerRecords,
  };
}
