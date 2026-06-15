// src/hooks/useBeers.ts
import { useState, useCallback } from 'react';
import { getBeers } from '../data';
import type { Beer } from '../data';

const useBeers = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setBeers(await getBeers());
    } finally {
      setLoading(false);
    }
  }, []);

  return { beers, loading, load };
};

export default useBeers;
