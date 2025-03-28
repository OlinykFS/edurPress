import { useEffect, useMemo, useState } from "react";
import { getCachedData, setCachedData, handleErrorDefault } from "@/services/utils/utils";

export function useCachedFetch<T>(cacheKey: string, fetcher: () => Promise<T>) {
  const cachedData = useMemo(() => getCachedData<T>(cacheKey), [cacheKey]);
  const [data, setData] = useState<T | null>(cachedData ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedData !== undefined && cachedData !== null) return;
    let isMounted = true;
    fetcher()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setCachedData(cacheKey, result);
        }
      })
      .catch((err) => {
        if (isMounted) setError(handleErrorDefault(err));
      });
    return () => {
      isMounted = false;
    };
  }, [cacheKey, cachedData, fetcher]);

  return { data, error };
}
