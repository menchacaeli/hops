import { runIngestion } from '../../../src/data/ingestion';

type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
};

function makeResponse(input: { ok: boolean; status?: number; json?: unknown; text?: string }): MockResponse {
  return {
    ok: input.ok,
    status: input.status ?? (input.ok ? 200 : 500),
    async json() {
      return input.json ?? null;
    },
    async text() {
      return input.text ?? '';
    },
  };
}

describe('ingestion runner', () => {
  it('ingests breweries from API and beers from website json-ld products', async () => {
    const fetcher = jest.fn(async (url: string) => {
      if (url.includes('openbrewerydb')) {
        return makeResponse({
          ok: true,
          json: [
            {
              name: 'La Cumbre Brewing Co.',
              city: 'Albuquerque',
              state: 'NM',
              street: '3313 Girard Blvd NE',
              website_url: 'https://lacumbrebrewing.com',
            },
          ],
        }) as unknown as Response;
      }

      return makeResponse({
        ok: true,
        text: `
          <html>
            <head>
              <script type="application/ld+json">
                {"@type":"Product","name":"Elevated IPA","image":"/images/elevated-ipa.png","description":"Flagship IPA"}
              </script>
            </head>
          </html>
        `,
      }) as unknown as Response;
    });

    const result = await runIngestion({ fetcher });

    expect(result.bundle.breweries).toHaveLength(1);
    expect(result.bundle.breweries[0].name).toBe('La Cumbre Brewing Co.');

    expect(result.bundle.beers).toHaveLength(1);
    expect(result.bundle.beers[0].name).toBe('Elevated IPA');
    expect(result.bundle.beers[0].image).toBe('https://lacumbrebrewing.com/images/elevated-ipa.png');
    expect(result.bundle.beers[0].breweryId).toBe('la-cumbre-brewing-co:albuquerque');
  });

  it('skips beers that cannot be linked to an ingested brewery', async () => {
    const fetcher = jest.fn(async (url: string) => {
      if (url.includes('openbrewerydb')) {
        return makeResponse({
          ok: true,
          json: [],
        }) as unknown as Response;
      }

      return makeResponse({
        ok: true,
        text: '<html></html>',
      }) as unknown as Response;
    });

    const result = await runIngestion({
      fetcher,
      sourceAdapters: [
        {
          id: 'manual-beers',
          async fetch() {
            return {
              breweries: [],
              beers: [
                {
                  beer: {
                    breweryId: 'missing:brewery',
                    name: 'Ghost IPA',
                  },
                  provenance: {
                    sourceId: 'manual',
                    sourceUrl: 'https://example.com',
                  },
                },
              ],
            };
          },
        },
      ],
    });

    expect(result.bundle.breweries).toHaveLength(0);
    expect(result.bundle.beers).toHaveLength(0);
  });
});
