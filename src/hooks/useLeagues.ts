import { useQuery } from 'react-query';
import { fetchAllLeagues, fetchSeasonBadge } from '../services/api';
import { League } from '../types/api';

export const useLeagues = () => {
  return useQuery<League[], Error>('leagues', fetchAllLeagues, {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours (1 day)
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours (1 day)
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useSeasonBadge = (
  leagueId: string,
  shouldFetch: boolean = false
) => {
  return useQuery<string, Error>(
    ['seasonBadge', leagueId],
    () => fetchSeasonBadge(leagueId),
    {
      enabled: !!leagueId && shouldFetch,
      staleTime: 24 * 60 * 60 * 1000, // 24 hours (1 day)
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours (1 day)
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
};
