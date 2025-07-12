import React from 'react';
import styled from 'styled-components';
import LeagueCard from './LeagueCard';
import { LeagueGridProps } from '../types/api';

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const LoadingCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-radius: 12px;
  padding: 20px;
  height: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LoadingBadge = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
  margin: 0 auto 15px;
`;

const LoadingText = styled.div`
  height: 20px;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin: 8px 0;

  &:nth-child(2) {
    width: 80%;
    margin: 8px auto;
  }

  &:nth-child(3) {
    width: 60%;
    margin: 8px auto;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ResultsCount = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const LeagueGrid: React.FC<LeagueGridProps> = ({
  leagues,
  isLoading,
  searchTerm,
  selectedSport,
}) => {
  if (isLoading) {
    return (
      <GridContainer>
        <LoadingContainer>
          {[...Array(8)].map((_, index) => (
            <LoadingCard key={index}>
              <LoadingBadge />
              <LoadingText />
              <LoadingText />
              <LoadingText />
            </LoadingCard>
          ))}
        </LoadingContainer>
      </GridContainer>
    );
  }

  if (!leagues || leagues.length === 0) {
    return (
      <GridContainer>
        <EmptyState>
          <EmptyStateTitle>No leagues found</EmptyStateTitle>
          <EmptyStateText>
            {searchTerm || selectedSport
              ? `No leagues match your current filters. Try adjusting your search or sport selection.`
              : 'Unable to load leagues. Please try again later.'}
          </EmptyStateText>
        </EmptyState>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <ResultsCount>
        Showing {leagues.length} league{leagues.length !== 1 ? 's' : ''}
        {(searchTerm || selectedSport) && ' matching your filters'}
      </ResultsCount>
      <Grid>
        {leagues.map(league => (
          <LeagueCard key={league.idLeague} league={league} />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default LeagueGrid;
