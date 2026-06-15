// src/hooks/useBreweries.ts
import { useState, useCallback } from 'react';
import { getBreweries } from '../data';
import type { Brewery } from '../data';

const useBreweries = () => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setBreweries(await getBreweries());
    setLoading(false);
  }, []);

  return { breweries, loading, load };
};

export default useBreweries;
