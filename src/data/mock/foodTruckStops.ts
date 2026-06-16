import type { FoodTruckStop } from '../models';

export const mockFoodTruckStops: FoodTruckStop[] = [
  {
    id: 'nomad-bbq:la-cumbre:2026-07-04t18-00-00-000z',
    foodTruckId: 'nomad-bbq',
    breweryId: 'la-cumbre',
    startAt: '2026-07-04T18:00:00.000Z',
    endAt: '2026-07-04T22:00:00.000Z',
    notes: 'Serving the full smoked meat menu.',
    sourceUrl: 'https://example.com/nomad-bbq/schedule',
  },
  {
    id: 'green-chile-wheels:marble:2026-07-12t17-00-00-000z',
    foodTruckId: 'green-chile-wheels',
    breweryId: 'marble',
    startAt: '2026-07-12T17:00:00.000Z',
    endAt: '2026-07-12T21:00:00.000Z',
    notes: 'Pairing specials for summer fest.',
    sourceUrl: 'https://example.com/green-chile-wheels/events',
  },
];
