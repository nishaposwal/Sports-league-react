# Deployment Guide

## Firebase Hosting Setup

This project is configured for deployment to Firebase Hosting.

### Prerequisites

1. **Firebase CLI**: Install globally
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase Account**: Login to Firebase
   ```bash
   firebase login
   ```

### Environment Configuration

The project uses environment-specific configuration files:

- `env.development` - Development environment settings
- `env.production` - Production environment settings

### Available Scripts

#### Development
```bash
npm start          # Start development server
npm test           # Run tests
npm run serve      # Serve production build locally
```

#### Production Build
```bash
npm run build:prod # Build with production environment
```

#### Deployment
```bash
npm run deploy     # Build and deploy to Firebase
npm run deploy:hosting # Deploy only hosting (faster)
```

### Deployment Process

1. **Build the Application**:
   ```bash
   npm run build:prod
   ```
   This creates a production build in the `build/` directory.

2. **Deploy to Firebase**:
   ```bash
   npm run deploy
   ```
   This builds and deploys to Firebase Hosting.

3. **Verify Deployment**:
   - Check the provided Firebase URL
   - Test all functionality
   - Verify caching works correctly

### Firebase Configuration

The `firebase.json` file is configured with:

- **Public Directory**: `build/` (React build output)
- **Single Page App**: All routes redirect to `index.html`
- **Caching Headers**: Static assets cached for 1 year
- **Ignore Patterns**: Excludes unnecessary files

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | API base URL | `https://www.thesportsdb.com/api/v1/json/3` |
| `REACT_APP_ENVIRONMENT` | Environment name | `development` |
| `REACT_APP_CACHE_DURATION` | Cache duration in ms | `86400000` (24 hours) |
| `REACT_APP_ENABLE_CACHE` | Enable caching | `true` |

### Troubleshooting

#### Common Issues

1. **Build Fails**:
   - Check for TypeScript errors: `npx tsc --noEmit`
   - Ensure all dependencies are installed: `npm install`

2. **Deployment Fails**:
   - Verify Firebase login: `firebase login`
   - Check project configuration: `firebase projects:list`

3. **Cache Issues**:
   - Clear browser cache
   - Check localStorage for cached data
   - Use "Clear All" button to reset

#### Performance Optimization

- Static assets are cached for 1 year
- API responses are cached for 24 hours
- React Query provides additional in-memory caching

### Monitoring

After deployment, monitor:

- **Performance**: Use Firebase Analytics
- **Errors**: Check Firebase Console
- **Cache**: Monitor localStorage usage
- **API Calls**: Verify caching reduces API calls

### Rollback

To rollback to a previous version:

```bash
firebase hosting:clone sports-league-react:live:sports-league-react:live
```

### Security

- Environment variables are embedded in build
- No sensitive data in client-side code
- API keys are public (TheSportsDB API)
- Consider rate limiting for production use 