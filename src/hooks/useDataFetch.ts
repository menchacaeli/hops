import { useState, useCallback } from 'react';
import { get } from '../lib/fetchRequests';

const useDataFetch = <T = unknown>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback((auth?: string | null) => {
    setLoading(true);
    setError(null);
    get(endpoint, auth)
      .then(result => {
        if (result && result.status === 'success') {
          setData(result.data as T[]);
        } else {
          setError(result ? result.data : 'Unknown error');
          setData([]);
        }
      })
      .catch(err => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error, load };
};

export default useDataFetch;
