import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the hooks and components to avoid complex setup
jest.mock('./hooks/useLeagues', () => ({
  useLeagues: () => ({
    data: [],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock('./hooks/useDebounce', () => ({
  useDebounce: (value: any) => value,
}));

jest.mock('./utils/filters', () => ({
  applyFilters: jest.fn(() => []),
  getUniqueSports: jest.fn(() => []),
}));

jest.mock('./components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('./components/LeagueGrid', () => {
  return function MockLeagueGrid() {
    return <div data-testid="league-grid">League Grid</div>;
  };
});

jest.mock('./components/CacheStatus', () => {
  return function MockCacheStatus() {
    return <div data-testid="cache-status">Cache Status</div>;
  };
});

jest.mock('./components/ErrorBoundary', () => {
  return function MockErrorBoundary({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('league-grid')).toBeInTheDocument();
    expect(screen.getByTestId('cache-status')).toBeInTheDocument();
  });
});
