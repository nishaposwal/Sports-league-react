// League API Response Types
export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface LeaguesResponse {
  leagues: League[];
}

// Season API Response Types
export interface Season {
  strSeason: string;
  strBadge: string;
}

export interface SeasonsResponse {
  seasons: Season[];
}

// API Error Types
export interface ApiError {
  message: string;
  status?: number;
}

// Filter Types
export interface FilterState {
  searchTerm: string;
  selectedSport: string;
}

// Component Props Types
export interface LeagueCardProps {
  league: League;
}

export interface LeagueGridProps {
  leagues: League[];
  isLoading: boolean;
  searchTerm: string;
  selectedSport: string;
}

export interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
  sports: string[];
  isSearching?: boolean;
}
