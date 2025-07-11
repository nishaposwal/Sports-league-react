import axios, { AxiosResponse } from 'axios';
import { LeaguesResponse, SeasonsResponse, ApiError } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://www.thesportsdb.com/api/v1/json/3';

// Cache configuration
const CACHE_DURATION = parseInt(process.env.REACT_APP_CACHE_DURATION || '86400000'); // 24 hours in milliseconds

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Cache utility functions
const getCacheKey = (url: string): string => `api_cache_${btoa(url)}`;

const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheItem: CacheItem<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - cacheItem.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for: ${key}`);
      return cacheItem.data;
    } else {
      // Remove expired cache
      localStorage.removeItem(key);
      console.log(`Cache expired for: ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

const setCachedData = <T>(key: string, data: T): void => {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
    console.log(`Cached data for: ${key}`);
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export const fetchAllLeagues = async (): Promise<LeaguesResponse['leagues']> => {
  const cacheKey = getCacheKey('/all_leagues.php');
  
  // Try to get cached data first
  const cachedData = getCachedData<LeaguesResponse['leagues']>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response: AxiosResponse<LeaguesResponse> = await api.get('/all_leagues.php');
    const leagues = response.data.leagues || [];
    
    // Cache the response
    setCachedData(cacheKey, leagues);
    
    return leagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw new Error('Failed to fetch leagues');
  }
};

export const fetchSeasonBadge = async (leagueId: string): Promise<string> => {
  const cacheKey = getCacheKey(`/search_all_seasons.php?badge=1&id=${leagueId}`);
  
  // Try to get cached data first
  const cachedData = getCachedData<string>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response: AxiosResponse<SeasonsResponse> = await api.get(`/search_all_seasons.php?badge=1&id=${leagueId}`);
    const seasons = response.data.seasons || [];
    
    let badgeUrl: string;
    
    // Return the first season's badge if available
    if (seasons.length > 0 && seasons[0].strBadge) {
      badgeUrl = seasons[0].strBadge;
    } else {
      // Return a default badge if no badge is available
      badgeUrl = 'https://via.placeholder.com/150x150/333/666?text=League';
    }
    
    // Cache the response
    setCachedData(cacheKey, badgeUrl);
    
    return badgeUrl;
  } catch (error) {
    console.error('Error fetching season badge:', error);
    const defaultBadge = 'https://via.placeholder.com/150x150/333/666?text=League';
    setCachedData(cacheKey, defaultBadge);
    return defaultBadge;
  }
};

export default api; 