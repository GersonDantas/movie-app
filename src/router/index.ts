import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default-layout.vue'
import { Home, Movie, Search } from '../pages'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/search',
          name: 'search',
          component: Search,
        },
        {
          path: '/movie/:id',
          name: 'movie-details',
          component: Movie,
        },
      ],
    },
  ],
})

export default router
