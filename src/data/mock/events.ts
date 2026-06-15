// src/data/mock/events.ts
import type { EventItem } from '../models';

export const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    breweryId: 'la-cumbre',
    name: 'Elevated IPA Release Party',
    image: '',
    description: 'Celebrate the annual Elevated IPA release with live music and food trucks.',
    date: '2026-07-04T18:00:00',
  },
  {
    id: 'evt-2',
    breweryId: 'la-cumbre',
    name: 'Trivia Night at La Cumbre',
    image: '',
    description: 'Test your knowledge every Thursday at our Nob Hill location.',
    date: '2026-06-19T19:00:00',
  },
  {
    id: 'evt-3',
    breweryId: 'marble',
    name: 'Marble Summer Fest',
    image: '',
    description: 'Outdoor beer garden with seasonal taps, lawn games, and live music.',
    date: '2026-06-28T14:00:00',
  },
  {
    id: 'evt-4',
    breweryId: 'marble',
    name: 'Double White Tap Takeover',
    image: '',
    description: 'All Double White variants on tap for one night only.',
    date: '2026-07-12T17:00:00',
  },
];
