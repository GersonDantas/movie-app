# Project Overview
This guide outlines the steps to create a Vue 3 project using TypeScript, Vite, Axios, Jest, Playwright, and Tailwind CSS. The goal is to build a movie listing application consuming the API from The Movie Database (TMDb).

# Features Requirements
- Use TMDb API to display a list of movies with filters for "Trending" and "Popular."
- Include a search functionality with query parameters reflected in the URL.
- Implement individual movie pages with detailed information and cast photos.
- Handle errors gracefully, such as API failures or network issues.
- Utilize lazy-loading for images and optimize API requests for performance.
- Write unit tests for all components and include optional end-to-end tests with Playwright.

## Folder Structure
Organize your project as follows:
```
movie-listing/
├── src/
│   ├── api/              # API calls
│   ├── assets/           # Static assets
│   ├── components/       # Reusable components
│   ├── layouts/          # Application layouts
│   ├── pages/            # Page components
│   ├── router/           # Vue Router setup
│   ├── store/            # Pinia stores
│   ├── styles/           # Global styles
│   ├── tests/            # Unit and e2e tests
│   ├── utils/            # Utility functions
│   └── main.ts           # Application entry point
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## API Setup
1. **Create an API Client**:
   - Add `src/api/tmdb.ts`:
     ```typescript
     import axios from 'axios';

     const apiClient = axios.create({
       baseURL: 'https://api.themoviedb.org/3',
       params: {
         api_key: process.env.VITE_TMDB_API_KEY,
       },
     });

     export default apiClient;
     ```

2. **Define API Methods**:
   - Extend `tmdb.ts`:
     ```typescript
     export const fetchMovies = (category: string) =>
       apiClient.get(`/movie/${category}`);

     export const searchMovies = (query: string) =>
       apiClient.get(`/search/movie`, { params: { query } });
     ```

## Router Setup
1. **Define Routes**:
   - Create `router/index.ts`:
     ```typescript
     import { createRouter, createWebHistory } from 'vue-router';
     import Home from '@/pages/Home.vue';
     import MovieDetails from '@/pages/MovieDetails.vue';

     const routes = [
       { path: '/', component: Home },
       { path: '/movie/:id', component: MovieDetails },
     ];

     const router = createRouter({
       history: createWebHistory(),
       routes,
     });

     export default router;
     ```

2. **Integrate Router**:
   - Update `main.ts`:
     ```typescript
     import { createApp } from 'vue';
     import App from './App.vue';
     import router from './router';
     import { createPinia } from 'pinia';

     import './assets/main.css';

     const app = createApp(App);

     app.use(router);
     app.use(createPinia());
     app.mount('#app');
     ```

## Component Development
1. **Create Reusable Components**:
   - `components/MovieCard.vue` for displaying movie details.
   - `components/ErrorMessage.vue` for error handling.
2. **Develop Pages**:
   - `pages/Home.vue` for listing movies.
   - `pages/MovieDetails.vue` for detailed movie info.

## Testing
### Unit Tests
1. **Write Tests**:
   - Example for `MovieCard.vue`:
     ```typescript
     import { mount } from '@vue/test-utils';
     import MovieCard from '@/components/MovieCard.vue';

     test('renders movie title', () => {
       const wrapper = mount(MovieCard, {
         props: { title: 'Inception' },
       });
       expect(wrapper.text()).toContain('Inception');
     });
     ```

### End-to-End Tests
1. **Add Playwright Tests**:
   - Example:
     ```typescript
     import { test, expect } from '@playwright/test';

     test('homepage has trending movies', async ({ page }) => {
       await page.goto('/');
       await expect(page.locator('text=Trending')).toBeVisible();
     });
     ```

## Rules
- All new components should be added to the components folder
- All new pages should be added to the pages folder
- All new layouts should be added to the layouts folder
- All new api calls should be added to the api folder
- All new utils should be added to the utils folder
- All new tests should be added to the tests folder
- If you can't do anything, tell me how to do it and wait for me to execute it and ask you to continue.
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
