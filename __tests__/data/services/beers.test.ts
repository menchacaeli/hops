// __tests__/data/services/beers.test.ts
import { getBeers, getBeer, getBeersByBrewery, getTopRatedBeers, updateBeer } from '../../../src/data/services/beers';

describe('beers service (mock)', () => {
  it('getBeers returns 12 beers', async () => {
    const beers = await getBeers();
    expect(beers.length).toBe(12);
  });

  it('every beer has required fields', async () => {
    const beers = await getBeers();
    beers.forEach(beer => {
      expect(typeof beer.id).toBe('string');
      expect(typeof beer.breweryId).toBe('string');
      expect(typeof beer.name).toBe('string');
      expect(typeof beer.abv).toBe('number');
      expect(typeof beer.ibu).toBe('number');
      expect(typeof beer.rating).toBe('number');
    });
  });

  it('getBeer returns correct beer by id', async () => {
    const beer = await getBeer('la-cumbre-1');
    expect(beer).not.toBeNull();
    expect(beer?.name).toBe('Elevated IPA');
  });

  it('getBeer returns null for unknown id', async () => {
    const beer = await getBeer('does-not-exist');
    expect(beer).toBeNull();
  });

  it('getBeersByBrewery filters by breweryId', async () => {
    const beers = await getBeersByBrewery('marble');
    expect(beers.length).toBe(3);
    beers.forEach(b => expect(b.breweryId).toBe('marble'));
  });

  it('getTopRatedBeers returns only beers with rating >= 3', async () => {
    const beers = await getTopRatedBeers();
    expect(beers.length).toBeGreaterThan(0);
    beers.forEach(b => expect(b.rating).toBeGreaterThanOrEqual(3));
  });

  it('updateBeer mutates the mock store', async () => {
    try {
      await updateBeer('bosque-1', { rating: 2 });
      const beer = await getBeer('bosque-1');
      expect(beer?.rating).toBe(2);
    } finally {
      await updateBeer('bosque-1', { rating: 4 });
    }
  });
});
