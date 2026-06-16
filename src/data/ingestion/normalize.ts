import type {
  Beer,
  Brewery,
  EventItem,
  FoodTruck,
  FoodTruckStop,
} from '../models';
import {
  makeBeerId,
  makeBreweryId,
  makeEventId,
  makeFoodTruckId,
  makeFoodTruckStopId,
} from './id';
import type {
  NormalizedBeerInput,
  NormalizedBreweryInput,
  NormalizedEventInput,
  NormalizedFoodTruckInput,
  NormalizedFoodTruckStopInput,
} from './types';

function defaultIso(dateLike: string): string {
  const parsed = new Date(dateLike);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid ISO date value: ${dateLike}`);
  }
  return parsed.toISOString();
}

export function normalizeBrewery(input: NormalizedBreweryInput): Brewery {
  return {
    id: makeBreweryId(input.name, input.city),
    name: input.name.trim(),
    address: input.address.trim(),
    phone: input.phone?.trim() ?? '',
    image: input.image?.trim() ?? '',
    rating: input.rating ?? 0,
    location: {
      latitude: input.latitude ?? 0,
      longitude: input.longitude ?? 0,
    },
  };
}

export function normalizeBeer(input: NormalizedBeerInput): Beer {
  return {
    id: makeBeerId(input.breweryId, input.name),
    breweryId: input.breweryId,
    name: input.name.trim(),
    abv: input.abv ?? 0,
    ibu: input.ibu ?? 0,
    description: input.description?.trim() ?? '',
    image: input.image?.trim() ?? '',
    rating: input.rating ?? 0,
  };
}

export function normalizeEvent(input: NormalizedEventInput): EventItem {
  const isoDate = defaultIso(input.date);
  return {
    id: makeEventId(input.breweryId, isoDate, input.name),
    breweryId: input.breweryId,
    name: input.name.trim(),
    image: input.image?.trim() ?? '',
    description: input.description?.trim() ?? '',
    date: isoDate,
  };
}

export function normalizeFoodTruck(input: NormalizedFoodTruckInput): FoodTruck {
  return {
    id: makeFoodTruckId(input.name),
    name: input.name.trim(),
    image: input.image?.trim() ?? '',
    website: input.website?.trim() ?? '',
    description: input.description?.trim() ?? '',
  };
}

export function normalizeFoodTruckStop(input: NormalizedFoodTruckStopInput): FoodTruckStop {
  const startAtIso = defaultIso(input.startAt);
  const endAtIso = defaultIso(input.endAt);

  return {
    id: makeFoodTruckStopId(input.foodTruckId, input.breweryId, startAtIso),
    foodTruckId: input.foodTruckId,
    breweryId: input.breweryId,
    startAt: startAtIso,
    endAt: endAtIso,
    notes: input.notes?.trim() ?? '',
    sourceUrl: input.sourceUrl?.trim() ?? '',
  };
}
