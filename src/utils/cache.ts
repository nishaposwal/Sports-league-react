// Cache utility functions for managing localStorage cache

export const clearApiCache = (): void => {
  try {
    const cacheKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('api_cache_')) {
        cacheKeys.push(key);
      }
    }
    cacheKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    console.log(`Cleared ${cacheKeys.length} cached items`);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const getCacheInfo = (): { totalItems: number; totalSize: number } => {
  try {
    const cacheKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('api_cache_')) {
        cacheKeys.push(key);
      }
    }
    let totalSize = 0;
    cacheKeys.forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += new Blob([item]).size;
      }
    });
    return {
      totalItems: cacheKeys.length,
      totalSize: totalSize, // in bytes
    };
  } catch (error) {
    console.error('Error getting cache info:', error);
    return { totalItems: 0, totalSize: 0 };
  }
};

export const isCacheValid = (key: string): boolean => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return false;

    const cacheItem = JSON.parse(cached);
    const now = Date.now();
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    return now - cacheItem.timestamp < CACHE_DURATION;
  } catch (error) {
    return false;
  }
};
