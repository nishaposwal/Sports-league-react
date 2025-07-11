import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

test('renders app title', () => {
  renderWithQueryClient(<App />);
  const titleElement = screen.getByText(/Sports Leagues/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input', () => {
  renderWithQueryClient(<App />);
  const searchInput = screen.getByPlaceholderText(/Search leagues/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders sport filter dropdown', () => {
  renderWithQueryClient(<App />);
  const sportSelect = screen.getByRole('combobox');
  expect(sportSelect).toBeInTheDocument();
}); 