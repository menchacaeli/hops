import {
  createFoodTruck,
  createFoodTruckStop,
  deleteFoodTruck,
  deleteFoodTruckStop,
  getFoodTruck,
  getFoodTruckStops,
  getFoodTruckStopsByBrewery,
  getFoodTrucks,
} from '../../../src/data/services/foodTrucks';

describe('food trucks service (mock)', () => {
  it('getFoodTrucks returns seeded trucks', async () => {
    const trucks = await getFoodTrucks();
    expect(trucks.length).toBeGreaterThan(0);
  });

  it('getFoodTruck returns one truck by id', async () => {
    const truck = await getFoodTruck('nomad-bbq');
    expect(truck?.name).toBe('Nomad BBQ');
  });

  it('getFoodTruckStopsByBrewery filters schedules', async () => {
    const stops = await getFoodTruckStopsByBrewery('la-cumbre');
    expect(stops.length).toBe(1);
    expect(stops[0].breweryId).toBe('la-cumbre');
  });

  it('can create and delete a food truck', async () => {
    const created = await createFoodTruck({
      name: 'Route 66 Eats',
      image: '',
      website: '',
      description: 'Pop-up menu',
    });

    const found = await getFoodTruck(created.id);
    expect(found).not.toBeNull();

    await deleteFoodTruck(created.id);
    const deleted = await getFoodTruck(created.id);
    expect(deleted).toBeNull();
  });

  it('can create and delete a food truck stop', async () => {
    const created = await createFoodTruckStop({
      foodTruckId: 'nomad-bbq',
      breweryId: 'bosque',
      startAt: '2026-08-10T18:00:00.000Z',
      endAt: '2026-08-10T21:00:00.000Z',
      notes: '',
      sourceUrl: 'https://example.com/schedule',
    });

    const allStops = await getFoodTruckStops();
    expect(allStops.some(s => s.id === created.id)).toBe(true);

    await deleteFoodTruckStop(created.id);
    const stopsAfterDelete = await getFoodTruckStops();
    expect(stopsAfterDelete.some(s => s.id === created.id)).toBe(false);
  });
});
