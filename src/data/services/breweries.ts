// src/data/services/breweries.ts
import { USE_MOCK } from '../config';
import { createDoc, deleteDocById, findById, listCollection, updateDocById } from '../firestoreClient';
import { mockBreweries } from '../mock/breweries';
import type { Brewery } from '../models';

export async function getBreweries(): Promise<Brewery[]> {
  if (USE_MOCK) return [...mockBreweries];
  return listCollection<Brewery>('breweries');
}

export async function getBrewery(id: string): Promise<Brewery | null> {
  if (USE_MOCK) return mockBreweries.find(b => b.id === id) ?? null;
  return findById<Brewery>('breweries', id);
}

export async function getTopRatedBreweries(): Promise<Brewery[]> {
  if (USE_MOCK) return mockBreweries.filter(b => b.rating >= 3);
  const all = await listCollection<Brewery>('breweries');
  return all.filter(b => b.rating >= 3).sort((a, b) => b.rating - a.rating);
}

export async function createBrewery(brewery: Omit<Brewery, 'id'>): Promise<Brewery> {
  if (USE_MOCK) {
    const newBrewery: Brewery = { ...brewery, id: `mock-brewery-${Date.now()}` };
    mockBreweries.push(newBrewery);
    return newBrewery;
  }
  return createDoc<Brewery>('breweries', brewery);
}

export async function updateBrewery(id: string, updates: Partial<Brewery>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBreweries.findIndex(b => b.id === id);
    if (idx !== -1) Object.assign(mockBreweries[idx], updates);
    return;
  }
  await updateDocById<Brewery>('breweries', id, updates);
}

export async function deleteBrewery(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockBreweries.findIndex(b => b.id === id);
    if (idx !== -1) mockBreweries.splice(idx, 1);
    return;
  }
  await deleteDocById('breweries', id);
}
