// src/data/services/beers.ts
import { USE_MOCK } from '../config';
import { mockBeers } from '../mock/beers';
import type { Beer } from '../models';

export async function getBeers(): Promise<Beer[]> {
  if (USE_MOCK) return [...mockBeers];
  // const snap = await getDocs(collection(db, 'beers'));
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as Beer));
  return [];
}

export async function getBeer(id: string): Promise<Beer | null> {
  if (USE_MOCK) return mockBeers.find(b => b.id === id) ?? null;
  // const snap = await getDoc(doc(db, 'beers', id));
  // return snap.exists() ? { id: snap.id, ...snap.data() } as Beer : null;
  return null;
}

export async function getBeersByBrewery(breweryId: string): Promise<Beer[]> {
  if (USE_MOCK) return mockBeers.filter(b => b.breweryId === breweryId);
  // const q = query(collection(db, 'beers'), where('breweryId', '==', breweryId));
  // const snap = await getDocs(q);
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as Beer));
  return [];
}

export async function getTopRatedBeers(): Promise<Beer[]> {
  if (USE_MOCK) return mockBeers.filter(b => b.rating >= 3);
  // const q = query(collection(db, 'beers'), where('rating', '>=', 3), orderBy('rating', 'desc'));
  // const snap = await getDocs(q);
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as Beer));
  return [];
}

export async function createBeer(beer: Omit<Beer, 'id'>): Promise<Beer> {
  if (USE_MOCK) {
    const newBeer: Beer = { ...beer, id: `mock-beer-${Date.now()}` };
    mockBeers.push(newBeer);
    return newBeer;
  }
  // const ref = await addDoc(collection(db, 'beers'), beer);
  // return { id: ref.id, ...beer };
  throw new Error('Firebase not configured');
}

export async function updateBeer(id: string, updates: Partial<Beer>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBeers.findIndex(b => b.id === id);
    if (idx !== -1) Object.assign(mockBeers[idx], updates);
    return;
  }
  // await updateDoc(doc(db, 'beers', id), updates);
}

export async function deleteBeer(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBeers.findIndex(b => b.id === id);
    if (idx !== -1) mockBeers.splice(idx, 1);
    return;
  }
  // await deleteDoc(doc(db, 'beers', id));
}
