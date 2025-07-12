# Sports Leagues React App

A modern single-page application (SPA) built with React and TypeScript that displays sports leagues with advanced filtering capabilities and interactive features. Features a Netflix-like UI with comprehensive caching, real-time search functionality, and enterprise-level code quality controls.

## 🚀 Features

### Core Functionality
- **League Display**: Shows sports leagues with their names, sport types, and alternate names
- **Real-time Search**: Debounced search functionality to filter leagues by name, alternate name, or sport type
- **Sport Filter**: Dropdown to filter by specific sport types
- **Interactive Cards**: Click on league cards to view season badges
- **Clear All Button**: Reset filters and clear cache with one click

### User Experience
- **Netflix-like UI**: Modern, dark theme with smooth animations and hover effects
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during data fetching with spinning indicators
- **Error Handling**: Graceful error handling with retry functionality and Error Boundaries

### Performance & Caching
- **24-Hour Caching**: API responses cached in localStorage for a full day
- **Cache Status Indicator**: Visual feedback showing cached data status
- **Debounced Search**: Prevents excessive API calls during typing
- **Optimized Rendering**: React Query for efficient data management

### Type Safety & Code Quality
- **Full TypeScript**: Complete type safety with comprehensive interfaces
- **API Type Definitions**: Strongly typed API responses and component props
- **Development Experience**: Enhanced IntelliSense and error detection
- **Pre-commit Hooks**: Automatic code formatting and linting before commits
- **Test Coverage**: Comprehensive unit tests with Jest and React Testing Library

## 🔌 API Integration

The app consumes the following APIs:
- **All Leagues API**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Badge Lookup API**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`

## 🛠️ Technologies Used

### Frontend Framework
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience

### State Management & Data Fetching
- **React Query**: For data fetching, caching, and state management
- **Custom Hooks**: `useLeagues`, `useDebounce` for specialized functionality

### Styling & UI
- **Styled Components**: For component-based styling
- **CSS3**: Custom animations and responsive design
- **Netflix-inspired Design**: Dark theme with modern aesthetics

### HTTP & Utilities
- **Axios**: For HTTP requests with interceptors
- **Custom Cache Utils**: LocalStorage-based caching system

### Testing & Quality Assurance
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **ESLint**: Code linting and error detection
- **Prettier**: Code formatting for consistency
- **Husky**: Git hooks for pre-commit automation
- **Lint-staged**: Run linters on staged files only

### Deployment & Hosting
- **Firebase Hosting**: Production deployment and hosting
- **Environment Configuration**: Separate configs for development and production

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nishaposwal/Sports-league-react.git
cd Sports-league-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run test:coverage`: Runs tests with coverage report
- `npm run build`: Builds the app for production
- `npm run build:prod`: Builds with production environment
- `npm run deploy`: Builds and deploys to Firebase
- `npm run deploy:hosting`: Deploy only hosting (faster)
- `npm run serve`: Serve production build locally
- `npm run eject`: Ejects from Create React App (not recommended)
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues automatically
- `npm run pre-commit`: Run pre-commit checks

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Header with search, filters, and debounce
│   ├── LeagueCard.tsx  # Individual league card component
│   ├── LeagueGrid.tsx  # Grid layout for league cards
│   ├── CacheStatus.tsx # Cache status indicator
│   └── ErrorBoundary.tsx # Error boundary for error handling
├── hooks/              # Custom React hooks
│   ├── useLeagues.ts   # Data fetching hooks with React Query
│   └── useDebounce.ts  # Debounce hook for search optimization
├── services/           # API services
│   └── api.ts          # API configuration and functions
├── types/              # TypeScript type definitions
│   └── api.ts          # API response interfaces
├── utils/              # Utility functions
│   ├── cache.ts        # LocalStorage caching utilities
│   └── filters.ts      # Filtering logic
├── components/__tests__/ # Component tests
│   └── Header.test.tsx # Header component tests
├── hooks/__tests__/    # Hook tests
│   └── useDebounce.test.ts # Debounce hook tests
├── utils/__tests__/    # Utility tests
│   └── filters.test.ts # Filter utility tests
├── App.tsx             # Main application component
├── App.test.tsx        # App component tests
├── index.tsx           # Application entry point
├── index.css           # Global styles
└── setupTests.ts       # Test setup configuration
```

## 🎯 Features in Detail

### Advanced Search & Filtering
- **Debounced Search**: 300ms delay prevents excessive API calls
- **Real-time Filtering**: Instant results as you type
- **Multi-field Search**: Searches across league names, alternate names, and sports
- **Sport Type Filter**: Dropdown for specific sport filtering
- **Combined Filters**: Search and sport type work together

### Interactive League Cards
- **Hover Effects**: Smooth animations on card interaction
- **Click to Load Badges**: Fetches and displays season badges
- **Loading States**: Visual feedback during badge loading
- **Error Handling**: Graceful fallbacks for failed badge loads

### Caching Strategy
- **React Query Caching**: Automatic caching with 24-hour stale time
- **LocalStorage Persistence**: Cache survives browser reloads
- **Cache Management**: Clear cache functionality with status indicator
- **Optimized Performance**: Reduces API calls and improves user experience

### Error Handling & Resilience
- **Error Boundaries**: React Error Boundaries for graceful error handling
- **Retry Mechanisms**: Automatic retry for failed API calls
- **Fallback UI**: User-friendly error states and loading indicators
- **Development Debugging**: Detailed error information in development mode

### TypeScript Implementation
- **API Types**: Strongly typed API responses
- **Component Props**: Type-safe component interfaces
- **Hook Types**: Properly typed custom hooks
- **Utility Types**: Type-safe utility functions

## ⚡ Performance Optimizations

- **React Query**: Efficient data fetching and caching
- **Debounced Search**: Prevents excessive API calls during typing
- **Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Images load with fallbacks
- **Responsive Images**: Optimized for different screen sizes
- **LocalStorage Caching**: Persistent cache across sessions

## 🎨 UI/UX Features

- **Netflix-inspired Design**: Dark theme with modern aesthetics
- **Smooth Animations**: CSS transitions and hover effects
- **Responsive Grid**: Adapts to different screen sizes
- **Loading Indicators**: Visual feedback during data fetching
- **Error States**: User-friendly error messages
- **Accessibility**: Semantic HTML and keyboard navigation

## 🧪 Testing & Quality Assurance

### Test Coverage (Cursor is used to write unit tests)
- **Component Tests**: Comprehensive tests for all React components
- **Hook Tests**: Unit tests for custom hooks with 100% coverage
- **Utility Tests**: Tests for utility functions and helpers
- **Integration Tests**: End-to-end functionality testing

### Code Quality Tools (Chat gpt + cursor for implementation support)
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for pre-commit automation
- **Lint-staged**: Efficient linting of staged files only

### Pre-commit Workflow (Chat gpt + cursor for implementation support)
- **Automatic Formatting**: Code is formatted with Prettier before commit
- **Lint Checking**: ESLint runs and auto-fixes issues
- **Test Execution**: All tests must pass before commit
- **Quality Gates**: Commits are blocked if quality checks fail

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

The app is deployed on Firebase Hosting with automatic builds and environment-specific configurations.

### Live Demo
**🌐 Live URL**: [https://sports-league-react.web.app](https://sports-league-react.web.app)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Run quality checks: `npm run lint && npm test`
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Workflow
- **Pre-commit Hooks**: Automatically format and lint code
- **Test Requirements**: All tests must pass before commit
- **Code Quality**: ESLint and Prettier ensure consistent code style
- **Type Safety**: TypeScript prevents type-related bugs

## 📄 License

This project is licensed under the MIT License.

## 🔧 Development Notes

- Built with Create React App + TypeScript
- Uses React Query for efficient data management
- Implements custom caching with localStorage
- Features debounced search for optimal performance
- Fully responsive with Netflix-inspired design
- Comprehensive TypeScript implementation for type safety
- Enterprise-level code quality with pre-commit hooks
- Comprehensive testing with Jest and React Testing Library
- Error boundaries for robust error handling

## 🙏 Acknowledgments

- **[TheSportsDB API](https://www.thesportsdb.com/)**: Provides comprehensive sports data and league information
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)**: For reliable and fast hosting
- **[Styled Components](https://styled-components.com/)**: For component-based styling
- **[Create React App](https://create-react-app.dev/)**: For the initial project setup and build configuration
- **[TypeScript](https://www.typescriptlang.org/)**: For type safety and better developer experience
- **[Jest](https://jestjs.io/)**: For comprehensive testing framework
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: For component testing utilities
- **[Husky](https://typicode.github.io/husky/)**: For Git hooks and pre-commit automation
- **[Prettier](https://prettier.io/)**: For code formatting and consistency

