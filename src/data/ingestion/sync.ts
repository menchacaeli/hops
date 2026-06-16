import { USE_MOCK } from '../config';
import { upsertDocById } from '../firestoreClient';
import type { Beer, Brewery } from '../models';
import { runIngestion } from './runner';

export type IngestionSyncSummary = {
  breweriesUpserted: number;
  beersUpserted: number;
};

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null) {
    const maybeCode = 'code' in error ? String((error as { code?: unknown }).code ?? '') : '';
    const maybeMessage =
      'message' in error ? String((error as { message?: unknown }).message ?? '') : '';
    const details = [maybeCode, maybeMessage].filter(Boolean).join(' ');
    if (details) return details;
  }
  if (typeof error === 'string') return error;
  return 'Unknown ingestion error';
}

function mapSyncFailure(stage: 'fetch' | 'write', error: unknown): Error {
  const raw = toErrorMessage(error);
  const normalized = raw.toLowerCase();

  if (normalized.includes('permission') || normalized.includes('insufficient')) {
    return new Error(
      `[${stage}] Firestore permission denied. Update rules to allow writes to breweries/beers for your current auth/session. Details: ${raw}`,
    );
  }

  if (normalized.includes('network') || normalized.includes('fetch')) {
    return new Error(
      `[${stage}] Network/source fetch failed while ingesting breweries. Details: ${raw}`,
    );
  }

  if (normalized.includes('firebase') || normalized.includes('firestore')) {
    return new Error(`[${stage}] Firebase/Firestore error. Details: ${raw}`);
  }

  return new Error(`[${stage}] ${raw}`);
}

export async function syncIngestionToFirestore(): Promise<IngestionSyncSummary> {
  console.log('[ingestion] sync start', { useMock: USE_MOCK });

  if (USE_MOCK) {
    throw new Error('Set EXPO_PUBLIC_USE_MOCK=false to run ingestion sync against Firebase.');
  }

  let result: Awaited<ReturnType<typeof runIngestion>>;
  try {
    result = await runIngestion();
    console.log('[ingestion] fetch complete', {
      breweries: result.bundle.breweries.length,
      beers: result.bundle.beers.length,
    });
  } catch (error) {
    console.error('[ingestion] fetch failed', error);
    throw mapSyncFailure('fetch', error);
  }

  if (result.bundle.breweries.length === 0) {
    throw new Error(
      'Ingestion ran but returned 0 breweries. Check internet access and source availability.',
    );
  }

  try {
    await Promise.all(
      result.bundle.breweries.map((brewery: Brewery) =>
        upsertDocById<Brewery>('breweries', brewery.id, {
          name: brewery.name,
          address: brewery.address,
          phone: brewery.phone,
          image: brewery.image,
          rating: brewery.rating,
          location: brewery.location,
        }),
      ),
    );
    console.log('[ingestion] breweries upsert complete', { count: result.bundle.breweries.length });

    await Promise.all(
      result.bundle.beers.map((beer: Beer) =>
        upsertDocById<Beer>('beers', beer.id, {
          breweryId: beer.breweryId,
          name: beer.name,
          abv: beer.abv,
          ibu: beer.ibu,
          description: beer.description,
          image: beer.image,
          rating: beer.rating,
        }),
      ),
    );
    console.log('[ingestion] beers upsert complete', { count: result.bundle.beers.length });
  } catch (error) {
    console.error('[ingestion] write failed', error);
    throw mapSyncFailure('write', error);
  }

  return {
    breweriesUpserted: result.bundle.breweries.length,
    beersUpserted: result.bundle.beers.length,
  };
}
