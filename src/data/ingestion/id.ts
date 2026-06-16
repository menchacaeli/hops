const NON_ALPHANUMERIC = /[^a-z0-9]+/g;

function normalizeToken(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(NON_ALPHANUMERIC, '-')
    .replace(/^-+|-+$/g, '');
}

export function makeBreweryId(name: string, city: string): string {
  return [normalizeToken(name), normalizeToken(city)].filter(Boolean).join(':');
}

export function makeBeerId(breweryId: string, beerName: string): string {
  return [normalizeToken(breweryId), normalizeToken(beerName)].filter(Boolean).join(':');
}

export function makeEventId(breweryId: string, startAtIso: string, title: string): string {
  return [normalizeToken(breweryId), normalizeToken(startAtIso), normalizeToken(title)]
    .filter(Boolean)
    .join(':');
}

export function makeFoodTruckId(name: string): string {
  return normalizeToken(name);
}

export function makeFoodTruckStopId(
  foodTruckId: string,
  breweryId: string,
  startAtIso: string,
): string {
  return [normalizeToken(foodTruckId), normalizeToken(breweryId), normalizeToken(startAtIso)]
    .filter(Boolean)
    .join(':');
}
