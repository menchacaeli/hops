import { useCallback, useState } from 'react';
import { getFoodTruckStops, getFoodTrucks } from '../data';
import type { FoodTruck, FoodTruckStop } from '../data';

const useFoodTrucks = () => {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [stops, setStops] = useState<FoodTruckStop[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [nextFoodTrucks, nextStops] = await Promise.all([
        getFoodTrucks(),
        getFoodTruckStops(),
      ]);
      setFoodTrucks(nextFoodTrucks);
      setStops(nextStops);
    } finally {
      setLoading(false);
    }
  }, []);

  return { foodTrucks, stops, loading, load };
};

export default useFoodTrucks;
