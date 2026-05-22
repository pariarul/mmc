import { useState, useMemo, useCallback, useEffect } from 'react';

/**
 * Custom React Hook to manage search, filtering, pagination, and sorting of lists.
 * Leverages useMemo and useCallback for high-performance rendering.
 * 
 * @param {Array} initialItems - The raw dataset to process
 * @param {Object} options - Configuration for filtering and sorting
 */
export function useOptimizedList(initialItems = [], options = {}) {
  const {
    filterKeys = [], // Keys to search (e.g., ['doctor_name', 'register_no'])
    defaultSortKey = 'created_at',
    defaultSortOrder = 'desc',
    defaultLimit = 10,
  } = options;

  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  // Sync state if initialItems change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Debounce search query to prevent filtering calculations on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset page on new search
    }, 250); // 250ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // 1. Memoize filtering of elements to prevent recalculating on every render
  const filteredItems = useMemo(() => {
    if (!debouncedSearchQuery || filterKeys.length === 0) {
      return items;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();

    return items.filter((item) =>
      filterKeys.some((key) => {
        const val = item[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(query);
      })
    );
  }, [items, debouncedSearchQuery, filterKeys]);

  // 2. Memoize sorting of filtered elements
  const sortedItems = useMemo(() => {
    if (!sortKey) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      let comparison = 0;
      if (typeof aVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (aVal instanceof Date) {
        comparison = new Date(aVal) - new Date(bVal);
      } else {
        comparison = aVal - bVal;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredItems, sortKey, sortOrder]);

  // 3. Memoize paginated slice of sorted elements
  const paginatedItems = useMemo(() => {
    const from = (currentPage - 1) * limit;
    const to = from + limit;
    return sortedItems.slice(from, to);
  }, [sortedItems, currentPage, limit]);

  // 4. Memoize calculated pagination metadata
  const paginationMeta = useMemo(() => {
    const total = sortedItems.length;
    return {
      currentPage,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < Math.ceil(total / limit),
    };
  }, [sortedItems.length, currentPage, limit]);

  // 5. Memoize callbacks to prevent children re-renders when passed as props
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleSort = useCallback((key) => {
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        return key;
      }
      setSortOrder('asc');
      return key;
    });
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  }, []);

  return useMemo(() => ({
    rawItems: items,
    items: paginatedItems,
    filteredCount: sortedItems.length,
    searchQuery,
    sortKey,
    sortOrder,
    pagination: paginationMeta,
    setSearchQuery: handleSearch,
    setSortKey: handleSort,
    setPage: handlePageChange,
    setLimit: handleLimitChange,
    setItems,
  }), [
    items,
    paginatedItems,
    sortedItems.length,
    searchQuery,
    sortKey,
    sortOrder,
    paginationMeta,
    handleSearch,
    handleSort,
    handlePageChange,
    handleLimitChange,
  ]);
}
