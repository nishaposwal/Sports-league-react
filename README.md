# Sports Leagues React App

A single-page application (SPA) built with React that displays sports leagues with filtering capabilities and interactive features.

## Features

- **League Display**: Shows sports leagues with their names, sport types, and alternate names
- **Search Functionality**: Filter leagues by name, alternate name, or sport type
- **Sport Filter**: Dropdown to filter by specific sport types
- **Clear All Button**: Reset filters and clear cache with one click
- **Interactive Cards**: Click on league cards to view season badges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Netflix-like UI**: Modern, dark theme with smooth animations and hover effects
- **24-Hour Caching**: API responses cached in localStorage for a full day
- **Cache Status Indicator**: Visual feedback showing cached data status
- **Error Handling**: Graceful error handling with retry functionality
- **TypeScript**: Fully type-safe with comprehensive type definitions

## API Integration

The app consumes the following APIs:
- **All Leagues API**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Badge Lookup API**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **React Query**: For data fetching, caching, and state management
- **Styled Components**: For component-based styling
- **Axios**: For HTTP requests
- **Firebase Hosting**: Production deployment and hosting
- **CSS3**: Custom animations and responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sports-league-react
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
- `npm run build`: Builds the app for production
- `npm run build:prod`: Builds with production environment
- `npm run deploy`: Builds and deploys to Firebase
- `npm run deploy:hosting`: Deploy only hosting (faster)
- `npm run serve`: Serve production build locally
- `npm run eject`: Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Header with search and filters
│   ├── LeagueCard.js   # Individual league card component
│   └── LeagueGrid.js   # Grid layout for league cards
├── hooks/              # Custom React hooks
│   └── useLeagues.js   # Data fetching hooks
├── services/           # API services
│   └── api.js          # API configuration and functions
├── utils/              # Utility functions
│   └── filters.js      # Filtering logic
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## Features in Detail

### League Display
- Shows `strLeague`, `strSport`, and `strLeagueAlternate` fields
- Responsive grid layout that adapts to screen size
- Loading states with shimmer animations

### Search and Filtering
- Real-time search across league names, alternate names, and sports
- Dropdown filter for specific sport types
- Combined filtering (search + sport type)

### Interactive Elements
- Hover effects on league cards
- Click to view season badges
- Smooth animations and transitions

### Caching Strategy
- React Query handles caching automatically
- 24-hour stale time for all data (leagues and badges)
- 24-hour cache time for optimal performance
- Prevents unnecessary API calls and reduces server load

## Performance Optimizations

- **React Query**: Efficient data fetching and caching
- **Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Images load with fallbacks
- **Responsive Images**: Optimized for different screen sizes
- **Debounced Search**: Prevents excessive API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 