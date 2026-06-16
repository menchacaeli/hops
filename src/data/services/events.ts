// src/data/services/events.ts
import { USE_MOCK } from '../config';
import {
  createDoc,
  deleteDocById,
  listCollection,
  listWhereEq,
  updateDocById,
} from '../firestoreClient';
import { mockEvents } from '../mock/events';
import type { EventItem } from '../models';

type EventFirestoreRecord = Omit<EventItem, 'date'> & {
  date: unknown;
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

function mapEventRecord(record: EventFirestoreRecord): EventItem {
  return {
    ...record,
    date: toIsoDate(record.date),
  };
}

export async function getEvents(): Promise<EventItem[]> {
  if (USE_MOCK) return [...mockEvents];
  const records = await listCollection<EventFirestoreRecord>('events');
  return records.map(mapEventRecord);
}

export async function getEventsByBrewery(breweryId: string): Promise<EventItem[]> {
  if (USE_MOCK) return mockEvents.filter(e => e.breweryId === breweryId);
  const records = await listWhereEq<EventFirestoreRecord>('events', 'breweryId', breweryId);
  return records.map(mapEventRecord);
}

export async function createEvent(event: Omit<EventItem, 'id'>): Promise<EventItem> {
  if (USE_MOCK) {
    const newEvent: EventItem = { ...event, id: `mock-evt-${Date.now()}` };
    mockEvents.push(newEvent);
    return newEvent;
  }
  const payload: Omit<EventItem, 'id'> = {
    ...event,
    date: toIsoDate(event.date),
  };
  return createDoc<EventItem>('events', payload);
}

export async function updateEvent(id: string, updates: Partial<EventItem>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx !== -1) Object.assign(mockEvents[idx], updates);
    return;
  }
  const nextUpdates: Partial<EventItem> = { ...updates };
  if (updates.date) nextUpdates.date = toIsoDate(updates.date);
  await updateDocById<EventItem>('events', id, nextUpdates);
}

export async function deleteEvent(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx !== -1) mockEvents.splice(idx, 1);
    return;
  }
  await deleteDocById('events', id);
}
