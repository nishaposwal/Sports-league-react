import {
  filterBySearch,
  filterBySport,
  getUniqueSports,
  applyFilters,
} from '../filters';
import { League } from '../../types/api';

const mockLeagues: League[] = [
  {
    idLeague: '1',
    strLeague: 'Premier League',
    strSport: 'Football',
    strLeagueAlternate: 'English Premier League',
  },
  {
    idLeague: '2',
    strLeague: 'NBA',
    strSport: 'Basketball',
    strLeagueAlternate: 'National Basketball Association',
  },
  {
    idLeague: '3',
    strLeague: 'La Liga',
    strSport: 'Football',
    strLeagueAlternate: 'Spanish Football League',
  },
  {
    idLeague: '4',
    strLeague: 'NFL',
    strSport: 'American Football',
    strLeagueAlternate: 'National Football League',
  },
];

describe('Filter Utilities', () => {
  describe('filterBySearch', () => {
    it('should return all leagues when search term is empty', () => {
      const result = filterBySearch(mockLeagues, '');
      expect(result).toEqual(mockLeagues);
    });

    it('should return all leagues when search term is only whitespace', () => {
      const result = filterBySearch(mockLeagues, '   ');
      expect(result).toEqual(mockLeagues);
    });

    it('should filter by league name (case insensitive)', () => {
      const result = filterBySearch(mockLeagues, 'premier');
      expect(result).toHaveLength(1);
      expect(result[0].strLeague).toBe('Premier League');
    });

    it('should filter by alternate name (case insensitive)', () => {
      const result = filterBySearch(mockLeagues, 'english');
      expect(result).toHaveLength(1);
      expect(result[0].strLeague).toBe('Premier League');
    });

    it('should filter by sport type (case insensitive)', () => {
      const result = filterBySearch(mockLeagues, 'football');
      expect(result).toHaveLength(3); // NFL also contains "Football" in its sport name
      expect(result.map(l => l.strLeague)).toContain('Premier League');
      expect(result.map(l => l.strLeague)).toContain('La Liga');
      expect(result.map(l => l.strLeague)).toContain('NFL');
    });

    it('should return empty array when no matches found', () => {
      const result = filterBySearch(mockLeagues, 'nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('filterBySport', () => {
    it('should return all leagues when no sport is selected', () => {
      const result = filterBySport(mockLeagues, '');
      expect(result).toEqual(mockLeagues);
    });

    it('should filter by exact sport match', () => {
      const result = filterBySport(mockLeagues, 'Football');
      expect(result).toHaveLength(2);
      expect(result.every(l => l.strSport === 'Football')).toBe(true);
    });

    it('should return empty array when sport not found', () => {
      const result = filterBySport(mockLeagues, 'Tennis');
      expect(result).toEqual([]);
    });
  });

  describe('getUniqueSports', () => {
    it('should return unique sports sorted alphabetically', () => {
      const result = getUniqueSports(mockLeagues);
      expect(result).toEqual(['American Football', 'Basketball', 'Football']);
    });

    it('should return empty array for empty input', () => {
      const result = getUniqueSports([]);
      expect(result).toEqual([]);
    });

    it('should handle null/undefined values', () => {
      const leaguesWithNulls = [
        ...mockLeagues,
        {
          idLeague: '5',
          strLeague: 'Test',
          strSport: null as any,
          strLeagueAlternate: 'Test',
        },
      ];
      const result = getUniqueSports(leaguesWithNulls);
      expect(result).toEqual(['American Football', 'Basketball', 'Football']);
    });
  });

  describe('applyFilters', () => {
    it('should apply both search and sport filters', () => {
      const result = applyFilters(mockLeagues, 'premier', 'Football');
      expect(result).toHaveLength(1);
      expect(result[0].strLeague).toBe('Premier League');
    });

    it('should return empty array when no matches for combined filters', () => {
      const result = applyFilters(mockLeagues, 'premier', 'Basketball');
      expect(result).toEqual([]);
    });

    it('should work with only search filter', () => {
      const result = applyFilters(mockLeagues, 'football', '');
      expect(result).toHaveLength(3); // NFL also contains "Football" in its sport name
    });

    it('should work with only sport filter', () => {
      const result = applyFilters(mockLeagues, '', 'Football');
      expect(result).toHaveLength(2);
    });

    it('should return all leagues when no filters applied', () => {
      const result = applyFilters(mockLeagues, '', '');
      expect(result).toEqual(mockLeagues);
    });
  });
});
