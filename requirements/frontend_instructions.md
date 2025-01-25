# Project Overview
This guide outlines the steps to create a Vue 3 project using TypeScript, Vite, Axios, Jest, Playwright, and Tailwind CSS. The goal is to build a movie listing application consuming the API from The Movie Database (TMDb).

# Features Requirements
- Display a list of movies from the TMDb API.
- Implement efficient filtering with query strings for search and category selection.
- Create a details page for movies with the poster, key information, and cast photos.
- Include error handling for API failures and connectivity issues.
- Implement lazy loading of images to improve performance.
- Write unit tests with Jest and end-to-end tests with Playwright.
- Style the application using Tailwind CSS.

# Relevant docs
- TMDb API: [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)
- Vite Shadcn UI: [https://pub.dev/packages/shadcn_ui](https://www.shadcn-vue.com/docs/installation/vite.html)
- Tailwind CSS: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- Vite: [https://vitejs.dev/](https://vitejs.dev/)
- Vue 3: [https://vuejs.org/](https://vuejs.org/)

## How to use TMDb API
- example of a request made with fetch, but needs to be transformed into an axios request
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWM3MWMxMDRjOWYwNDYwZmIyZjc5ZDkzZGZmNGFhZSIsIm5iZiI6MTczNzgwOTQ2NS40NjUsInN1YiI6IjY3OTRkZTM5YzdiMDFiNzJjNzIzYTY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f9TcmXEQz09YmnRYyAWTjayLxd8sbILTka6sl2e2iA0'
  }
};

fetch('https://api.themoviedb.org/3/authentication', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

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

# Current file structure
```plaintext
MOVIE-LISTING-WEB/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.vue
│   │   │   ├── input.vue
│   │   │   ├── movie-card.vue
│   │   │   └── navbar.vue
│   │   └── movie/
│   │       ├── movie-list.vue
│   │       └── movie-details.vue
│   ├── layouts/
│   │   └── default-layout.vue
│   ├── pages/
│   │   ├── index.vue
│   │   ├── search.vue
│   │   └── movie.vue
│   ├── services/
│   │   └── api-service.ts
│   ├── store/
│   │   └── movie-store.ts
│   ├── utils/
│   │   └── helper.ts
│   ├── App.vue
│   └── main.ts
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── tsconfig.json
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

- Example listing: https://www.themoviedb.org/ (You don’t need to replicate all the elements of this page, just the text filter, the standard movie listing, and some option to switch between “Trending” and “Most Popular” categories.) 

- Example movie page: https://www.themoviedb.org/movie/603692-john-wick-chapter-4 (The page should include the movie cover and key information, highlighted with a banner below, and photos of the cast.) 

- Example search page: https://www.themoviedb.org/search?query=john (Only the card listing, which can be the same as the standard listing, is required. You don’t need to include other elements, such as the “Search Results” box on the left.) 

- The search and listing do not need to have different routes, but they must work correctly, and the filters must be reflected in the query strings so that the search link can be shared.
