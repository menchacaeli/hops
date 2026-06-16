// src/data/services/beers.ts
import { USE_MOCK } from '../config';
import { createDoc, deleteDocById, findById, listCollection, listWhereEq, updateDocById } from '../firestoreClient';
import { mockBeers } from '../mock/beers';
import type { Beer } from '../models';

export async function getBeers(): Promise<Beer[]> {
  if (USE_MOCK) return [...mockBeers];
  return listCollection<Beer>('beers');
}

export async function getBeer(id: string): Promise<Beer | null> {
  if (USE_MOCK) return mockBeers.find(b => b.id === id) ?? null;
  return findById<Beer>('beers', id);
}

export async function getBeersByBrewery(breweryId: string): Promise<Beer[]> {
  if (USE_MOCK) return mockBeers.filter(b => b.breweryId === breweryId);
  return listWhereEq<Beer>('beers', 'breweryId', breweryId);
}

export async function getTopRatedBeers(): Promise<Beer[]> {
  if (USE_MOCK) return mockBeers.filter(b => b.rating >= 3);
  const all = await listCollection<Beer>('beers');
  return all.filter(b => b.rating >= 3).sort((a, b) => b.rating - a.rating);
}

export async function createBeer(beer: Omit<Beer, 'id'>): Promise<Beer> {
  if (USE_MOCK) {
    const newBeer: Beer = { ...beer, id: `mock-beer-${Date.now()}` };
    mockBeers.push(newBeer);
    return newBeer;
  }
  return createDoc<Beer>('beers', beer);
}

export async function updateBeer(id: string, updates: Partial<Beer>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBeers.findIndex(b => b.id === id);
    if (idx !== -1) Object.assign(mockBeers[idx], updates);
    return;
  }
  await updateDocById<Beer>('beers', id, updates);
}

export async function deleteBeer(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBeers.findIndex(b => b.id === id);
    if (idx !== -1) mockBeers.splice(idx, 1);
    return;
  }
  await deleteDocById('beers', id);
}
