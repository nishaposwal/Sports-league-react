import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useLeagues } from './hooks/useLeagues';
import { useDebounce } from './hooks/useDebounce';
import { applyFilters, getUniqueSports } from './utils/filters';
import Header from './components/Header';
import LeagueGrid from './components/LeagueGrid';
import CacheStatus from './components/CacheStatus';
import ErrorBoundary from './components/ErrorBoundary';
import { League } from './types/api';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #e50914;
  margin-bottom: 15px;
  font-size: 1.8rem;
`;

const ErrorMessage = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  font-size: 1rem;
  max-width: 500px;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(229, 9, 20, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('');

  // Debounce search term to prevent excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  // Check if search is being debounced (when searchTerm differs from debouncedSearchTerm)
  const isSearching = searchTerm !== debouncedSearchTerm;

  const { data: leagues, isLoading, error, refetch } = useLeagues();

  // Get unique sports for the dropdown
  const sports = useMemo((): string[] => {
    return getUniqueSports(leagues || []);
  }, [leagues]);

  // Apply filters to leagues using debounced search term
  const filteredLeagues = useMemo((): League[] => {
    if (!leagues) return [];
    return applyFilters(leagues, debouncedSearchTerm, selectedSport);
  }, [leagues, debouncedSearchTerm, selectedSport]);

  // Handle search input change
  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  // Handle sport selection change
  const handleSportChange = (value: string): void => {
    setSelectedSport(value);
  };

  // Handle retry on error
  const handleRetry = (): void => {
    refetch();
  };

  if (error) {
    return (
      <AppContainer>
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We couldn't load the sports leagues. This might be due to a network
            issue or the API being temporarily unavailable.
          </ErrorMessage>
          <RetryButton onClick={handleRetry}>Try Again</RetryButton>
        </ErrorContainer>
      </AppContainer>
    );
  }

  return (
    <ErrorBoundary>
      <AppContainer>
        <Header
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedSport={selectedSport}
          onSportChange={handleSportChange}
          sports={sports}
          isSearching={isSearching}
        />
        <LeagueGrid
          leagues={filteredLeagues}
          isLoading={isLoading}
          searchTerm={debouncedSearchTerm}
          selectedSport={selectedSport}
        />
        <CacheStatus />
      </AppContainer>
    </ErrorBoundary>
  );
};

export default App;
