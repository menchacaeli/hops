// src/hooks/useUserFavorites.ts
import { useState, useCallback } from 'react';
import { getCurrentUser, getFavoriteBeers, getFavoriteBreweries, addFavoriteBeer, removeFavoriteBeer, addFavoriteBrewery, removeFavoriteBrewery } from '../data';
import type { Beer, Brewery } from '../data';

const useUserFavorites = () => {
  const [favoriteBeers, setFavoriteBeers] = useState<Beer[]>([]);
  const [favoriteBreweries, setFavoriteBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(false);

  const getUid = () => getCurrentUser()?.uid ?? '';

  const load = useCallback(async () => {
    const uid = getUid();
    if (!uid) return;
    setLoading(true);
    const [beers, breweries] = await Promise.all([getFavoriteBeers(uid), getFavoriteBreweries(uid)]);
    setFavoriteBeers(beers);
    setFavoriteBreweries(breweries);
    setLoading(false);
  }, []);

  const isBeerFavorite = useCallback((beerId: string) =>
    favoriteBeers.some(b => b.id === beerId), [favoriteBeers]);

  const isBreweryFavorite = useCallback((breweryId: string) =>
    favoriteBreweries.some(b => b.id === breweryId), [favoriteBreweries]);

  const addBeerFavorite = useCallback(async (beerId: string) => {
    const uid = getUid();
    if (!uid) return;
    await addFavoriteBeer(uid, beerId);
  }, []);

  const removeBeerFavorite = useCallback(async (beerId: string) => {
    const uid = getUid();
    if (!uid) return;
    await removeFavoriteBeer(uid, beerId);
  }, []);

  const addBreweryFavorite = useCallback(async (breweryId: string) => {
    const uid = getUid();
    if (!uid) return;
    await addFavoriteBrewery(uid, breweryId);
  }, []);

  const removeBreweryFavorite = useCallback(async (breweryId: string) => {
    const uid = getUid();
    if (!uid) return;
    await removeFavoriteBrewery(uid, breweryId);
  }, []);

  return {
    favoriteBeers,
    favoriteBreweries,
    loading,
    load,
    isBeerFavorite,
    isBreweryFavorite,
    addBeerFavorite,
    removeBeerFavorite,
    addBreweryFavorite,
    removeBreweryFavorite,
  };
};

export default useUserFavorites;
