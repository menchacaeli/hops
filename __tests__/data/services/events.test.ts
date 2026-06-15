// __tests__/data/services/events.test.ts
import { getEvents, getEventsByBrewery } from '../../../src/data/services/events';

describe('events service (mock)', () => {
  it('getEvents returns 4 events', async () => {
    const events = await getEvents();
    expect(events.length).toBe(4);
  });

  it('every event has required fields', async () => {
    const events = await getEvents();
    events.forEach(e => {
      expect(typeof e.id).toBe('string');
      expect(typeof e.breweryId).toBe('string');
      expect(typeof e.name).toBe('string');
      expect(typeof e.date).toBe('string');
    });
  });

  it('getEventsByBrewery filters by breweryId', async () => {
    const events = await getEventsByBrewery('marble');
    expect(events.length).toBe(2);
    events.forEach(e => expect(e.breweryId).toBe('marble'));
  });
});
