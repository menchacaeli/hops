// src/data/services/user.ts
import { USE_MOCK } from '../config';
import { mockUsers } from '../mock/users';
import { getBeers } from './beers';
import { getBreweries } from './breweries';
import type { User, Beer, Brewery } from '../models';

export async function getUser(uid: string): Promise<User | null> {
  if (USE_MOCK) return mockUsers.find(u => u.uid === uid) ?? null;
  // const snap = await getDoc(doc(db, 'users', uid));
  // return snap.exists() ? snap.data() as User : null;
  return null;
}

export async function getFavoriteBeers(uid: string): Promise<Beer[]> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === uid);
    if (!user) return [];
    const allBeers = await getBeers();
    return allBeers.filter(b => user.favoriteBeerIds.includes(b.id));
  }
  // const user = await getUser(uid);
  // if (!user || !user.favoriteBeerIds.length) return [];
  // const snaps = await Promise.all(user.favoriteBeerIds.map(id => getDoc(doc(db, 'beers', id))));
  // return snaps.filter(s => s.exists()).map(s => ({ id: s.id, ...s.data() } as Beer));
  return [];
}

export async function getFavoriteBreweries(uid: string): Promise<Brewery[]> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === uid);
    if (!user) return [];
    const allBreweries = await getBreweries();
    return allBreweries.filter(b => user.favoriteBreweryIds.includes(b.id));
  }
  // const user = await getUser(uid);
  // if (!user || !user.favoriteBreweryIds.length) return [];
  // const snaps = await Promise.all(user.favoriteBreweryIds.map(id => getDoc(doc(db, 'breweries', id))));
  // return snaps.filter(s => s.exists()).map(s => ({ id: s.id, ...s.data() } as Brewery));
  return [];
}

export async function addFavoriteBeer(uid: string, beerId: string): Promise<void> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === uid);
    if (user && !user.favoriteBeerIds.includes(beerId)) user.favoriteBeerIds.push(beerId);
    return;
  }
  // await updateDoc(doc(db, 'users', uid), { favoriteBeerIds: arrayUnion(beerId) });
}

export async function removeFavoriteBeer(uid: string, beerId: string): Promise<void> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === uid);
    if (user) user.favoriteBeerIds = user.favoriteBeerIds.filter(id => id !== beerId);
    return;
  }
  // await updateDoc(doc(db, 'users', uid), { favoriteBeerIds: arrayRemove(beerId) });
}

export async function addFavoriteBrewery(uid: string, breweryId: string): Promise<void> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === uid);
    if (user && !user.favoriteBreweryIds.includes(breweryId)) user.favoriteBreweryIds.push(breweryId);
    return;
  }
  // await updateDoc(doc(db, 'users', uid), { favoriteBreweryIds: arrayUnion(breweryId) });
}

export async function removeFavoriteBrewery(uid: string, breweryId: string): Promise<void> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === uid);
    if (user) user.favoriteBreweryIds = user.favoriteBreweryIds.filter(id => id !== breweryId);
    return;
  }
  // await updateDoc(doc(db, 'users', uid), { favoriteBreweryIds: arrayRemove(breweryId) });
}
