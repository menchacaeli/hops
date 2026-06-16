import {
  normalizeBeer,
  normalizeBrewery,
  normalizeEvent,
  normalizeFoodTruck,
  normalizeFoodTruckStop,
} from '../../../src/data/ingestion';

describe('ingestion normalize', () => {
  it('normalizes brewery defaults', () => {
    const brewery = normalizeBrewery({
      name: 'La Cumbre Brewing Co.',
      city: 'Albuquerque',
      address: '3313 Girard Blvd NE',
    });

    expect(brewery.id).toBe('la-cumbre-brewing-co:albuquerque');
    expect(brewery.phone).toBe('');
    expect(brewery.rating).toBe(0);
    expect(brewery.location.latitude).toBe(0);
    expect(brewery.location.longitude).toBe(0);
  });

  it('normalizes beer defaults', () => {
    const beer = normalizeBeer({ breweryId: 'la-cumbre', name: 'Elevated IPA' });

    expect(beer.id).toBe('la-cumbre:elevated-ipa');
    expect(beer.abv).toBe(0);
    expect(beer.ibu).toBe(0);
    expect(beer.description).toBe('');
  });

  it('normalizes event with ISO date', () => {
    const event = normalizeEvent({
      breweryId: 'la-cumbre',
      name: 'Release Party',
      date: '2026-07-04T18:00:00Z',
      description: 'Seasonal launch',
    });

    expect(event.id).toContain('la-cumbre:');
    expect(event.date).toBe('2026-07-04T18:00:00.000Z');
    expect(event.description).toBe('Seasonal launch');
  });

  it('throws for invalid event date', () => {
    expect(() =>
      normalizeEvent({
        breweryId: 'la-cumbre',
        name: 'Release Party',
        date: 'not-a-date',
      }),
    ).toThrow('Invalid ISO date value: not-a-date');
  });

  it('normalizes food truck defaults', () => {
    const truck = normalizeFoodTruck({ name: 'Nomad BBQ' });

    expect(truck.id).toBe('nomad-bbq');
    expect(truck.website).toBe('');
    expect(truck.description).toBe('');
  });

  it('normalizes food truck stop with ISO dates', () => {
    const stop = normalizeFoodTruckStop({
      foodTruckId: 'nomad-bbq',
      breweryId: 'la-cumbre',
      startAt: '2026-07-04T17:00:00Z',
      endAt: '2026-07-04T21:00:00Z',
      sourceUrl: 'https://example.com/schedule',
    });

    expect(stop.id).toContain('nomad-bbq:la-cumbre:');
    expect(stop.startAt).toBe('2026-07-04T17:00:00.000Z');
    expect(stop.endAt).toBe('2026-07-04T21:00:00.000Z');
    expect(stop.sourceUrl).toBe('https://example.com/schedule');
  });
});
