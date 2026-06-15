// src/data/services/breweries.ts
import { USE_MOCK } from '../config';
import { mockBreweries } from '../mock/breweries';
import type { Brewery } from '../models';

export async function getBreweries(): Promise<Brewery[]> {
  if (USE_MOCK) return [...mockBreweries];
  // const snap = await getDocs(collection(db, 'breweries'));
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as Brewery));
  return [];
}

export async function getBrewery(id: string): Promise<Brewery | null> {
  if (USE_MOCK) return mockBreweries.find(b => b.id === id) ?? null;
  // const snap = await getDoc(doc(db, 'breweries', id));
  // return snap.exists() ? { id: snap.id, ...snap.data() } as Brewery : null;
  return null;
}

export async function getTopRatedBreweries(): Promise<Brewery[]> {
  if (USE_MOCK) return mockBreweries.filter(b => b.rating >= 3);
  // const q = query(collection(db, 'breweries'), where('rating', '>=', 3), orderBy('rating', 'desc'));
  // const snap = await getDocs(q);
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as Brewery));
  return [];
}

export async function createBrewery(brewery: Omit<Brewery, 'id'>): Promise<Brewery> {
  if (USE_MOCK) {
    const newBrewery: Brewery = { ...brewery, id: `mock-brewery-${Date.now()}` };
    mockBreweries.push(newBrewery);
    return newBrewery;
  }
  // const ref = await addDoc(collection(db, 'breweries'), brewery);
  // return { id: ref.id, ...brewery };
  throw new Error('Firebase not configured');
}

export async function updateBrewery(id: string, updates: Partial<Brewery>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBreweries.findIndex(b => b.id === id);
    if (idx !== -1) Object.assign(mockBreweries[idx], updates);
    return;
  }
  // await updateDoc(doc(db, 'breweries', id), updates);
}

export async function deleteBrewery(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBreweries.findIndex(b => b.id === id);
    if (idx !== -1) mockBreweries.splice(idx, 1);
    return;
  }
  // await deleteDoc(doc(db, 'breweries', id));
}
