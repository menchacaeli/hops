// __tests__/data/services/user.test.ts
import {
  getUser,
  getFavoriteBeers,
  getFavoriteBreweries,
  addFavoriteBeer,
  removeFavoriteBeer,
  addFavoriteBrewery,
  removeFavoriteBrewery,
} from '../../../src/data/services/user';
import { MOCK_CURRENT_USER_UID } from '../../../src/data/mock/users';

const uid = MOCK_CURRENT_USER_UID;

describe('user service (mock)', () => {
  it('getUser returns the mock user', async () => {
    const user = await getUser(uid);
    expect(user?.uid).toBe(uid);
    expect(user?.email).toBe('dev@hops.com');
  });

  it('getUser returns null for unknown uid', async () => {
    expect(await getUser('nobody')).toBeNull();
  });

  it('getFavoriteBeers returns beers matching favoriteBeerIds', async () => {
    const beers = await getFavoriteBeers(uid);
    expect(beers.length).toBeGreaterThan(0);
    beers.forEach(b => expect(typeof b.id).toBe('string'));
  });

  it('getFavoriteBreweries returns breweries matching favoriteBreweryIds', async () => {
    const breweries = await getFavoriteBreweries(uid);
    expect(breweries.length).toBeGreaterThan(0);
  });

  it('addFavoriteBeer adds a beer id to user favorites', async () => {
    try {
      await addFavoriteBeer(uid, 'bosque-1');
      const beers = await getFavoriteBeers(uid);
      expect(beers.some(b => b.id === 'bosque-1')).toBe(true);
    } finally {
      await removeFavoriteBeer(uid, 'bosque-1');
    }
  });

  it('removeFavoriteBeer removes a beer id from user favorites', async () => {
    await addFavoriteBeer(uid, 'bosque-2');
    try {
      await removeFavoriteBeer(uid, 'bosque-2');
      const beers = await getFavoriteBeers(uid);
      expect(beers.some(b => b.id === 'bosque-2')).toBe(false);
    } finally {
      await removeFavoriteBeer(uid, 'bosque-2');
    }
  });

  it('addFavoriteBrewery and removeFavoriteBrewery toggle brewery favorites', async () => {
    try {
      await addFavoriteBrewery(uid, 'bosque');
      const after = await getFavoriteBreweries(uid);
      expect(after.some(b => b.id === 'bosque')).toBe(true);
      await removeFavoriteBrewery(uid, 'bosque');
      const final = await getFavoriteBreweries(uid);
      expect(final.some(b => b.id === 'bosque')).toBe(false);
    } finally {
      await removeFavoriteBrewery(uid, 'bosque');
    }
  });
});
