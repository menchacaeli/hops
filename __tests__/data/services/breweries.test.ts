// __tests__/data/services/breweries.test.ts
import { getBreweries, getBrewery, getTopRatedBreweries } from '../../../src/data/services/breweries';

describe('breweries service (mock)', () => {
  it('getBreweries returns 4 breweries', async () => {
    const breweries = await getBreweries();
    expect(breweries.length).toBe(4);
  });

  it('every brewery has required fields including location', async () => {
    const breweries = await getBreweries();
    breweries.forEach(b => {
      expect(typeof b.id).toBe('string');
      expect(typeof b.name).toBe('string');
      expect(typeof b.address).toBe('string');
      expect(typeof b.location.latitude).toBe('number');
      expect(typeof b.location.longitude).toBe('number');
    });
  });

  it('getBrewery returns correct brewery by id', async () => {
    const b = await getBrewery('marble');
    expect(b?.name).toBe('Marble Brewery');
  });

  it('getBrewery returns null for unknown id', async () => {
    expect(await getBrewery('nope')).toBeNull();
  });

  it('getTopRatedBreweries returns only breweries with rating >= 3', async () => {
    const breweries = await getTopRatedBreweries();
    breweries.forEach(b => expect(b.rating).toBeGreaterThanOrEqual(3));
  });
});
