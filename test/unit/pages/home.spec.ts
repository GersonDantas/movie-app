import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/pages/Home/index.vue'
import { useMovieStore } from '@/store/movie-store'
import dayjs from 'dayjs'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'

const mockMovies = [
  {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    backdrop_path: '/backdrop.jpg',
    overview: 'Test overview',
    release_date: '2024-01-01',
    vote_average: 7.5
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: { template: '<div></div>' }
    }
  ]
})

const makeSut = () => {
  const wrapper = mount(Home, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            movie: {
              trending: mockMovies,
              popular: [],
              activeTab: 'trending',
              timeWindow: 'week',
              loading: false,
              error: null
            }
          }
        })
      ],
      stubs: {
        MovieCard: {
          template: `
            <div class="movie-card">
              <h3>{{ movie.title }}</h3>
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
              <p>{{ formatDate(movie.release_date) }}</p>
            </div>
          `,
          props: ['movie'],
          methods: {
            formatDate(date: string) {
              return dayjs(date).format('MMM D, YYYY')
            }
          }
        },
        MovieFilters: true,
        Progress: true,
        MovieTabs: {
          template: `
            <div class="flex gap-2 mb-6">
              <button 
                data-testid="trending-btn"
                :class="{ 'bg-tmdb-secondary': activeTab === 'trending', 'bg-gray-700': activeTab !== 'trending' }"
              >
                Trending
              </button>
              <button 
                data-testid="popular-btn"
                :class="{ 'bg-tmdb-secondary': activeTab === 'popular', 'bg-gray-700': activeTab !== 'popular' }"
              >
                Popular
              </button>
            </div>
          `,
          props: ['activeTab']
        }
      }
    }
  })
  const store = useMovieStore()
  return { wrapper, store }
}

describe('Home Component', () => {
  beforeEach(() => {
    router.push('/')
  })

  it('renders correctly', () => {
    const { wrapper } = makeSut()
    expect(wrapper.find('h1').text()).toBe('Welcome to TMDB')
    expect(wrapper.find('h2').text()).toBe('Trending')
  })

  it('displays trending movies', () => {
    const { wrapper } = makeSut()
    const movieCards = wrapper.findAll('.movie-card')
    expect(movieCards.length).toBe(mockMovies.length)

    const firstMovie = movieCards[0]
    expect(firstMovie.find('h3').text()).toBe('Test Movie')
    expect(firstMovie.find('img').attributes('src'))
      .toBe('https://image.tmdb.org/t/p/w500/test.jpg')
  })

  it('formats date correctly', () => {
    const { wrapper } = makeSut()
    const dateText = wrapper.find('.movie-card p').text()
    expect(dateText).toBe(dayjs('2024-01-01').format('MMM D, YYYY'))
  })

  it('fetches trending movies on mount', () => {
    const store = useMovieStore()
    makeSut()
    expect(store.fetchTrending).toHaveBeenCalled()
  })
})
