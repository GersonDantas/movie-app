import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Home from '@/pages/Home/index.vue'
import { useMovieStore } from '@/store/movie-store'
import dayjs from 'dayjs'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

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

const mackSut = () => {
  const wrapper = mount(Home, {
    global: {
      plugins: [router]
    }
  })

  return { wrapper }
}

describe('Home Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const store = useMovieStore()
    store.trending = mockMovies
    vi.spyOn(store, 'fetchTrending').mockImplementation(() => Promise.resolve())
  })

  it('renders correctly', () => {
    const { wrapper } = mackSut()
    expect(wrapper.find('h1').text()).toBe('Welcome to TMDB')
    expect(wrapper.find('h2').text()).toBe('Trending')
  })

  it('displays trending movies', () => {
    const { wrapper } = mackSut()
    const movieCards = wrapper.findAll('.movie-card')
    expect(movieCards.length).toBe(mockMovies.length)

    const firstMovie = movieCards[0]
    expect(firstMovie.find('h3').text()).toBe('Test Movie')
    expect(firstMovie.find('img').attributes('src'))
      .toBe('https://image.tmdb.org/t/p/w500/test.jpg')
  })

  it('formats date correctly', () => {
    const { wrapper } = mackSut()
    const dateText = wrapper.find('.movie-card p').text()
    expect(dateText).toBe(dayjs('2024-01-01').format('MMM D, YYYY'))
  })

  it('toggles time window correctly', async () => {
    const { wrapper } = mackSut()
    const [todayBtn, weekBtn] = wrapper.findAll('button').slice(0, 2)

    expect(weekBtn.classes()).toContain('bg-tmdb-secondary')

    await todayBtn.trigger('click')
    expect(todayBtn.classes()).toContain('bg-tmdb-secondary')
    expect(weekBtn.classes()).toContain('bg-gray-700')
  })

  it('fetches trending movies on mount', () => {
    const store = useMovieStore()
    mackSut()
    expect(store.fetchTrending).toHaveBeenCalled()
  })
})
