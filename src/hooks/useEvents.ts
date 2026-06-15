// src/hooks/useEvents.ts
import { useState, useCallback } from 'react';
import { getEvents } from '../data';
import type { EventItem } from '../data';

const useEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setEvents(await getEvents());
    } finally {
      setLoading(false);
    }
  }, []);

  return { events, loading, load };
};

export default useEvents;
