# TMDB Movie App

A modern web application to explore movies using the TMDB (The Movie Database) API. Available at [movie-news.netlify.app](https://movie-news.netlify.app/).

![Test Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen.svg)

## 🎬 About The Project

This project is a web application that allows users to:
- Explore popular and trending movies
- Search for specific movies
- View complete movie details
- See cast and technical information
- Filter movies by genre, year, and popularity

## 🚀 Technologies Used

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Adds static typing to JavaScript
- **Pinia** - State Management
- **Tailwind CSS** - Utility-first CSS Framework
- **Vitest** - Unit Testing Framework
- **Vue Router** - Official Vue.js Router
- **Axios** - HTTP Client for requests
- **DayJS** - Date manipulation library
- **Shadcn-Vue** - Reusable and accessible components

## 🛠️ Architecture

The project follows a clean and modular architecture:
- `/components` - Reusable components
- `/pages` - Application pages
- `/store` - State management with Pinia
- `/types` - TypeScript type definitions
- `/infra` - Infrastructure configurations
- `/test` - Unit and integration tests

## 🔍 Key Features

- **Movie List**
  - Trending movies
  - Popular movies
  - Search system
  - Pagination

- **Movie Details**
  - Complete information
  - Cast
  - Ratings
  - Technical data

- **Filters**
  - By genre
  - By year
  - By popularity

- **Interface**
  - Light/Dark theme
  - Loading states
  - Error handling
  - 404 page

## 🎯 Future Improvements

### Performance
- [ ] Image lazy loading
- [ ] Route-based code splitting
- [ ] Request caching
- [ ] Server-side rendering (Nuxt.js)

### Testing
- [ ] E2E tests with Cypress
- [ ] Integration tests
- [ ] Test coverage > 90%
- [ ] Component tests with Testing Library

### Features
- [ ] User authentication
- [ ] Favorites list
- [ ] User ratings
- [ ] Personalized recommendations
- [ ] Trailers and videos
- [ ] Advanced filters
- [ ] Internationalization (i18n)

### CI/CD
- [ ] Deploy pipeline
- [ ] Static code analysis
- [ ] Semantic versioning
- [ ] Docker

## 🧪 Testing

The project has comprehensive test coverage using Vitest:

- **Current Coverage**: 85% across all components and stores
- **Testing Strategy**: Unit tests for components, stores, and utilities
- **Continuous Testing**: Automated tests run on every PR
- **Coverage Reports**: HTML reports generated for detailed analysis

Run the tests:
```bash
# Run tests
npm run test

# Run tests with coverage report
npm run test:coverage
```

Key tested areas:
- Component rendering and interactions
- Store actions and state management
- API integration
- User interactions
- Route handling
- Theme switching
- Error scenarios

## 🚀 How to Run

1. Clone the repository
```bash
git clone https://github.com/your-username/tmdb-movie-app.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. Run the project
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── composables/    # Vue composables
├── layouts/        # Application layouts
├── pages/         # Page components
├── router/        # Route configuration
├── store/         # Pinia store
├── services/      # External services
├── types/         # TypeScript types
├── utils/         # Utilities
└── App.vue        # Root component
```

## 📱 Responsiveness

The application is fully responsive, adapting to:
- Mobile devices
- Tablets
- Desktops

## 🌐 Deploy

The application is hosted on [Netlify](https://movie-news.netlify.app/), with automatic CI/CD from the main branch.

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 🤝 Contributing

Contributions are always welcome! Please read the [contribution guide](CONTRIBUTING.md) first.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
