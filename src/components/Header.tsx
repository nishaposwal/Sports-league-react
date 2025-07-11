import React from 'react';
import styled from 'styled-components';
import { HeaderProps } from '../types/api';
import { clearApiCache } from '../utils/cache';

const HeaderContainer = styled.header`
  background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
  }
`;

const SportSelect = styled.select`
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 16px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
  }
  
  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const ClearAllButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(229, 9, 20, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange, 
  selectedSport, 
  onSportChange, 
  sports 
}) => {
  const handleClearAll = () => {
    // Clear search and sport filters
    onSearchChange('');
    onSportChange('');
    // Clear API cache
    clearApiCache();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>Sports Leagues</Title>
        <FiltersContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search leagues..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </SearchContainer>
          <SportSelect
            value={selectedSport}
            onChange={(e) => onSportChange(e.target.value)}
          >
            <option value="">All Sports</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </SportSelect>
          <ClearAllButton onClick={handleClearAll}>
            Clear All
          </ClearAllButton>
        </FiltersContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 