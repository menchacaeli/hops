// src/data/services/events.ts
import { USE_MOCK } from '../config';
import { mockEvents } from '../mock/events';
import type { EventItem } from '../models';

export async function getEvents(): Promise<EventItem[]> {
  if (USE_MOCK) return [...mockEvents];
  // const snap = await getDocs(collection(db, 'events'));
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as EventItem));
  return [];
}

export async function getEventsByBrewery(breweryId: string): Promise<EventItem[]> {
  if (USE_MOCK) return mockEvents.filter(e => e.breweryId === breweryId);
  // const q = query(collection(db, 'events'), where('breweryId', '==', breweryId));
  // const snap = await getDocs(q);
  // return snap.docs.map(d => ({ id: d.id, ...d.data() } as EventItem));
  return [];
}

export async function createEvent(event: Omit<EventItem, 'id'>): Promise<EventItem> {
  if (USE_MOCK) {
    const newEvent: EventItem = { ...event, id: `mock-evt-${Date.now()}` };
    mockEvents.push(newEvent);
    return newEvent;
  }
  // const ref = await addDoc(collection(db, 'events'), event);
  // return { id: ref.id, ...event };
  throw new Error('Firebase not configured');
}

export async function updateEvent(id: string, updates: Partial<EventItem>): Promise<void> {
  if (USE_MOCK) {
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx !== -1) Object.assign(mockEvents[idx], updates);
    return;
  }
  // await updateDoc(doc(db, 'events', id), updates);
}

export async function deleteEvent(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx !== -1) mockEvents.splice(idx, 1);
    return;
  }
  // await deleteDoc(doc(db, 'events', id));
}
