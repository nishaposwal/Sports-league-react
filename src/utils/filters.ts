import { League } from '../types/api';

/**
 * Filter leagues by search term (case-insensitive)
 * @param leagues - Array of league objects
 * @param searchTerm - Search term to filter by
 * @returns Filtered leagues
 */
export const filterBySearch = (
  leagues: League[],
  searchTerm: string
): League[] => {
  if (!searchTerm.trim()) return leagues;

  const term = searchTerm.toLowerCase().trim();

  return leagues.filter(league => {
    const leagueName = league.strLeague?.toLowerCase() || '';
    const alternateName = league.strLeagueAlternate?.toLowerCase() || '';
    const sport = league.strSport?.toLowerCase() || '';

    return (
      leagueName.includes(term) ||
      alternateName.includes(term) ||
      sport.includes(term)
    );
  });
};

/**
 * Filter leagues by sport type
 * @param leagues - Array of league objects
 * @param selectedSport - Sport type to filter by
 * @returns Filtered leagues
 */
export const filterBySport = (
  leagues: League[],
  selectedSport: string
): League[] => {
  if (!selectedSport) return leagues;

  return leagues.filter(league => league.strSport === selectedSport);
};

/**
 * Get unique sport types from leagues
 * @param leagues - Array of league objects
 * @returns Array of unique sport types
 */
export const getUniqueSports = (leagues: League[]): string[] => {
  if (!leagues || !Array.isArray(leagues)) return [];

  const sports = leagues.map(league => league.strSport).filter(Boolean); // Remove null/undefined values

  return Array.from(new Set(sports)).sort();
};

/**
 * Apply all filters to leagues
 * @param leagues - Array of league objects
 * @param searchTerm - Search term
 * @param selectedSport - Selected sport type
 * @returns Filtered leagues
 */
export const applyFilters = (
  leagues: League[],
  searchTerm: string,
  selectedSport: string
): League[] => {
  let filteredLeagues = leagues;

  // Apply search filter
  filteredLeagues = filterBySearch(filteredLeagues, searchTerm);

  // Apply sport filter
  filteredLeagues = filterBySport(filteredLeagues, selectedSport);

  return filteredLeagues;
};
