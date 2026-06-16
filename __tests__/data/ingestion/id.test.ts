import {
  makeBeerId,
  makeBreweryId,
  makeEventId,
  makeFoodTruckId,
  makeFoodTruckStopId,
} from '../../../src/data/ingestion';

describe('ingestion ids', () => {
  it('builds deterministic brewery ids', () => {
    expect(makeBreweryId('La Cumbre Brewing Co.', 'Albuquerque')).toBe(
      'la-cumbre-brewing-co:albuquerque',
    );
  });

  it('builds deterministic beer ids', () => {
    expect(makeBeerId('la-cumbre', 'Elevated IPA')).toBe('la-cumbre:elevated-ipa');
  });

  it('builds deterministic event ids', () => {
    expect(makeEventId('la-cumbre', '2026-07-04T18:00:00.000Z', 'Release Party')).toBe(
      'la-cumbre:2026-07-04t18-00-00-000z:release-party',
    );
  });

  it('builds deterministic food truck ids', () => {
    expect(makeFoodTruckId('Nomad BBQ')).toBe('nomad-bbq');
  });

  it('builds deterministic food truck stop ids', () => {
    expect(
      makeFoodTruckStopId('nomad-bbq', 'la-cumbre', '2026-07-04T18:00:00.000Z'),
    ).toBe('nomad-bbq:la-cumbre:2026-07-04t18-00-00-000z');
  });
});
