import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

// Mock the cache utility
jest.mock('../../utils/cache', () => ({
  clearApiCache: jest.fn(),
}));

describe('Header Component', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: jest.fn(),
    selectedSport: '',
    onSportChange: jest.fn(),
    sports: ['Football', 'Basketball', 'Soccer'],
    isSearching: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Sports Leagues')).toBeInTheDocument();
  });

  it('renders search input with correct placeholder', () => {
    render(<Header {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search leagues...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders sport select dropdown', () => {
    render(<Header {...defaultProps} />);
    const sportSelect = screen.getByRole('combobox');
    expect(sportSelect).toBeInTheDocument();
  });

  it('renders Clear All button', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', () => {
    const mockOnSearchChange = jest.fn();
    render(<Header {...defaultProps} onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search leagues...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('test');
  });

  it('calls onSportChange when sport select changes', () => {
    const mockOnSportChange = jest.fn();
    render(<Header {...defaultProps} onSportChange={mockOnSportChange} />);

    const sportSelect = screen.getByRole('combobox');
    fireEvent.change(sportSelect, { target: { value: 'Football' } });

    expect(mockOnSportChange).toHaveBeenCalledWith('Football');
  });

  it('displays all sports in dropdown', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText('All Sports')).toBeInTheDocument();
    expect(screen.getByText('Football')).toBeInTheDocument();
    expect(screen.getByText('Basketball')).toBeInTheDocument();
    expect(screen.getByText('Soccer')).toBeInTheDocument();
  });

  it('shows search indicator when isSearching is true', () => {
    render(<Header {...defaultProps} isSearching={true} />);

    // The search indicator should be present in the DOM
    const searchInput = screen.getByPlaceholderText('Search leagues...');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays current search term in input', () => {
    render(<Header {...defaultProps} searchTerm="Premier League" />);

    const searchInput = screen.getByPlaceholderText('Search leagues...');
    expect(searchInput).toHaveValue('Premier League');
  });

  it('displays current selected sport in dropdown', () => {
    render(<Header {...defaultProps} selectedSport="Football" />);

    const sportSelect = screen.getByRole('combobox');
    expect(sportSelect).toHaveValue('Football');
  });
});
