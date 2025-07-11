import React, { useState } from 'react';
import styled from 'styled-components';
import { useSeasonBadge } from '../hooks/useLeagues';
import { LeagueCardProps } from '../types/api';

const CardContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(229, 9, 20, 0.5);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(229, 9, 20, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const Badge = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    border-color: rgba(229, 9, 20, 0.8);
    transform: scale(1.1);
  }
`;

const LeagueName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-align: center;
  line-height: 1.3;
`;

const SportType = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
  text-align: center;
  font-weight: 500;
`;

const AlternateName = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
`;

const DefaultBadge = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  text-align: center;
  line-height: 1.2;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${CardContainer}:hover & {
    border-color: rgba(229, 9, 20, 0.8);
    transform: scale(1.1);
    background: linear-gradient(135deg, #444 0%, #666 100%);
  }
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

const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const { data: badgeUrl, isLoading: badgeLoading } = useSeasonBadge(
    league.idLeague,
    showBadge
  );

  const handleCardClick = (): void => {
    setShowBadge(true);
  };

  return (
    <CardContainer className="fade-in" onClick={handleCardClick}>
      <BadgeContainer>
        {!showBadge ? (
          <DefaultBadge>
              Click to<br />View Badge
            </DefaultBadge>
        ) : badgeLoading ? (
          <LoadingBadge />
        ) : (
          <Badge 
            src={badgeUrl} 
            alt={`${league.strLeague} badge`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/80x80/333/666?text=League';
            }}
          />
        )}
      </BadgeContainer>
      
      <LeagueName>{league.strLeague}</LeagueName>
      <SportType>{league.strSport}</SportType>
      {league.strLeagueAlternate && (
        <AlternateName>{league.strLeagueAlternate}</AlternateName>
      )}
    </CardContainer>
  );
};

export default LeagueCard; 