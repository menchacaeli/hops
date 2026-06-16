import { absolutizeUrl, extractJsonLdBlocks, stripTags } from '../../../src/data/ingestion/parsers/html';

describe('html parser helpers', () => {
  it('extracts JSON-LD blocks from html', () => {
    const html = `
      <html>
        <head>
          <script type="application/ld+json">
            {"@type":"Product","name":"Elevated IPA"}
          </script>
        </head>
      </html>
    `;

    const blocks = extractJsonLdBlocks(html);
    expect(blocks).toHaveLength(1);
    expect(blocks[0]['@type']).toBe('Product');
    expect(blocks[0].name).toBe('Elevated IPA');
  });

  it('strips html tags from text', () => {
    expect(stripTags('<p>Big <b>hop</b> profile</p>')).toBe('Big hop profile');
  });

  it('absolutizes relative urls', () => {
    expect(absolutizeUrl('/images/beer.png', 'https://brewery.example/menu')).toBe(
      'https://brewery.example/images/beer.png',
    );
  });
});
