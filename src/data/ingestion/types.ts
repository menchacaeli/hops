import type { Beer, Brewery, EventItem, FoodTruck, FoodTruckStop } from '../models';

export type CanonicalEntityType =
  | 'brewery'
  | 'beer'
  | 'event'
  | 'foodTruck'
  | 'foodTruckStop';

export type IngestionProvenance = {
  sourceId: string;
  sourceUrl: string;
  lastSeenAt: string;
  contentHash: string;
  confidenceScore: number;
};

export type CanonicalRecord<T> = {
  entityType: CanonicalEntityType;
  data: T;
  provenance: IngestionProvenance;
};

export type NormalizedBreweryInput = {
  name: string;
  city: string;
  address: string;
  phone?: string;
  image?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
};

export type NormalizedBeerInput = {
  breweryId: string;
  name: string;
  description?: string;
  image?: string;
  rating?: number;
  abv?: number;
  ibu?: number;
};

export type NormalizedEventInput = {
  breweryId: string;
  name: string;
  date: string;
  image?: string;
  description?: string;
};

export type NormalizedFoodTruckInput = {
  name: string;
  image?: string;
  website?: string;
  description?: string;
};

export type NormalizedFoodTruckStopInput = {
  foodTruckId: string;
  breweryId: string;
  startAt: string;
  endAt: string;
  notes?: string;
  sourceUrl?: string;
};

export type IngestionNormalizedBundle = {
  breweries: Brewery[];
  beers: Beer[];
  events: EventItem[];
  foodTrucks: FoodTruck[];
  foodTruckStops: FoodTruckStop[];
};
