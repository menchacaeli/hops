import { USE_MOCK } from '../config';
import {
  createDoc,
  deleteDocById,
  findById,
  listCollection,
  listWhereEq,
  updateDocById,
} from '../firestoreClient';
import { mockFoodTrucks } from '../mock/foodTrucks';
import { mockFoodTruckStops } from '../mock/foodTruckStops';
import type { FoodTruck, FoodTruckStop } from '../models';

type FoodTruckStopFirestoreRecord = Omit<FoodTruckStop, 'startAt' | 'endAt'> & {
  startAt: unknown;
  endAt: unknown;
};

function toIsoDate(value: unknown): string {
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as { toDate: () => Date }).toDate === 'function'
  ) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }

  return '';
}

function mapStopRecord(record: FoodTruckStopFirestoreRecord): FoodTruckStop {
  return {
    ...record,
    startAt: toIsoDate(record.startAt),
    endAt: toIsoDate(record.endAt),
  };
}

export async function getFoodTrucks(): Promise<FoodTruck[]> {
  if (USE_MOCK) return [...mockFoodTrucks];
  return listCollection<FoodTruck>('foodTrucks');
}

export async function getFoodTruck(id: string): Promise<FoodTruck | null> {
  if (USE_MOCK) return mockFoodTrucks.find(t => t.id === id) ?? null;
  return findById<FoodTruck>('foodTrucks', id);
}

export async function getFoodTruckStops(): Promise<FoodTruckStop[]> {
  if (USE_MOCK) return [...mockFoodTruckStops];
  const records = await listCollection<FoodTruckStopFirestoreRecord>('foodTruckStops');
  return records.map(mapStopRecord);
}

export async function getFoodTruckStopsByBrewery(breweryId: string): Promise<FoodTruckStop[]> {
  if (USE_MOCK) return mockFoodTruckStops.filter(stop => stop.breweryId === breweryId);
  const records = await listWhereEq<FoodTruckStopFirestoreRecord>(
    'foodTruckStops',
    'breweryId',
    breweryId,
  );
  return records.map(mapStopRecord);
}

export async function createFoodTruck(foodTruck: Omit<FoodTruck, 'id'>): Promise<FoodTruck> {
  if (USE_MOCK) {
    const newFoodTruck: FoodTruck = { ...foodTruck, id: `mock-food-truck-${Date.now()}` };
    mockFoodTrucks.push(newFoodTruck);
    return newFoodTruck;
  }
  return createDoc<FoodTruck>('foodTrucks', foodTruck);
}

export async function createFoodTruckStop(stop: Omit<FoodTruckStop, 'id'>): Promise<FoodTruckStop> {
  if (USE_MOCK) {
    const newStop: FoodTruckStop = { ...stop, id: `mock-food-truck-stop-${Date.now()}` };
    mockFoodTruckStops.push(newStop);
    return newStop;
  }
  const payload: Omit<FoodTruckStop, 'id'> = {
    ...stop,
    startAt: toIsoDate(stop.startAt),
    endAt: toIsoDate(stop.endAt),
  };
  return createDoc<FoodTruckStop>('foodTruckStops', payload);
}

export async function updateFoodTruck(id: string, updates: Partial<FoodTruck>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockFoodTrucks.findIndex(t => t.id === id);
    if (idx !== -1) Object.assign(mockFoodTrucks[idx], updates);
    return;
  }
  await updateDocById<FoodTruck>('foodTrucks', id, updates);
}

export async function updateFoodTruckStop(id: string, updates: Partial<FoodTruckStop>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockFoodTruckStops.findIndex(stop => stop.id === id);
    if (idx !== -1) Object.assign(mockFoodTruckStops[idx], updates);
    return;
  }
  const nextUpdates: Partial<FoodTruckStop> = { ...updates };
  if (updates.startAt) nextUpdates.startAt = toIsoDate(updates.startAt);
  if (updates.endAt) nextUpdates.endAt = toIsoDate(updates.endAt);
  await updateDocById<FoodTruckStop>('foodTruckStops', id, nextUpdates);
}

export async function deleteFoodTruck(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockFoodTrucks.findIndex(t => t.id === id);
    if (idx !== -1) mockFoodTrucks.splice(idx, 1);
    return;
  }
  await deleteDocById('foodTrucks', id);
}

export async function deleteFoodTruckStop(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockFoodTruckStops.findIndex(stop => stop.id === id);
    if (idx !== -1) mockFoodTruckStops.splice(idx, 1);
    return;
  }
  await deleteDocById('foodTruckStops', id);
}
