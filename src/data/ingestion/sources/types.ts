import type { NormalizedBeerInput, NormalizedBreweryInput } from '../types';

export type SourceRecordProvenance = {
  sourceId: string;
  sourceUrl: string;
};

export type SourcedBreweryRecord = {
  brewery: NormalizedBreweryInput;
  websiteUrl?: string;
  provenance: SourceRecordProvenance;
};

export type SourcedBeerRecord = {
  beer: NormalizedBeerInput;
  provenance: SourceRecordProvenance;
};

export type SourceFetchResult = {
  breweries: SourcedBreweryRecord[];
  beers: SourcedBeerRecord[];
};

export type SourceFetchContext = {
  fetcher: (url: string, init?: RequestInit) => Promise<Response>;
};

export type IngestionSourceAdapter = {
  id: string;
  fetch: (ctx: SourceFetchContext) => Promise<SourceFetchResult>;
};
