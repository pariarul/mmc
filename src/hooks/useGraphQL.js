import { useState, useCallback, useMemo, useRef } from 'react';

// Global cache to store query results for fast client-side loading
const graphQLCache = new Map();

/**
 * Custom React Hook for optimized GraphQL interactions.
 * Utilizes caching, useCallback, and useMemo to minimize re-renders and enable fast loading.
 */
export function useGraphQL() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep track of the active request to avoid duplicate concurrent fetches
  const activeRequests = useRef(new Map());

  /**
   * executeQuery: Memoized function to perform GraphQL queries with client-side caching.
   * Resolves "usecallback and usememo like coustem hook" request for fast loading.
   */
  const executeQuery = useCallback(async (query, variables = {}, options = { skipCache: false }) => {
    const cacheKey = JSON.stringify({ query, variables });

    // 1. Check client-side cache for instant loading
    if (!options.skipCache && graphQLCache.has(cacheKey)) {
      const cachedData = graphQLCache.get(cacheKey);
      setData(cachedData);
      setError(null);
      return cachedData;
    }

    // 2. Check if the exact same request is already in-flight to prevent duplicate fetches
    if (activeRequests.current.has(cacheKey)) {
      return activeRequests.current.get(cacheKey);
    }

    setLoading(true);
    setError(null);

    const fetchPromise = (async () => {
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();

        if (result.errors && result.errors.length > 0) {
          throw new Error(result.errors[0].message || 'GraphQL Error');
        }

        const responseData = result.data;

        // Populate client-side cache for future queries
        if (!options.skipCache) {
          graphQLCache.set(cacheKey, responseData);
        }

        setData(responseData);
        return responseData;
      } catch (err) {
        console.error('GraphQL Query execution error:', err);
        setError(err.message || 'An error occurred during query execution.');
        throw err;
      } finally {
        setLoading(false);
        activeRequests.current.delete(cacheKey);
      }
    })();

    activeRequests.current.set(cacheKey, fetchPromise);
    return fetchPromise;
  }, []);

  /**
   * executeMutation: Memoized function to execute GraphQL mutations.
   * Avoids caching since mutations alter server-side data, but utilizes useCallback.
   */
  const executeMutation = useCallback(async (mutation, variables = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const result = await response.json();

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message || 'GraphQL Error');
      }

      const responseData = result.data;
      setData(responseData);

      // Invalidate the cache since database state has changed
      graphQLCache.clear();

      return responseData;
    } catch (err) {
      console.error('GraphQL Mutation execution error:', err);
      setError(err.message || 'An error occurred during mutation execution.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * clearCache: Memoized helper to manually reset the GraphQL query cache
   */
  const clearCache = useCallback(() => {
    graphQLCache.clear();
  }, []);

  // Memoize return state to prevent rendering issues in consumer components
  return useMemo(() => ({
    data,
    loading,
    error,
    executeQuery,
    executeMutation,
    clearCache
  }), [data, loading, error, executeQuery, executeMutation, clearCache]);
}
