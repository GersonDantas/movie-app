import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import Movie from '@/pages/Movie/index.vue'
import { useMovieStore } from '@/store/movie-store'

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 7.5
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/',
      component: { template: '<div>Home</div>' }
    },
    { 
      path: '/movie/:id',
      name: 'movie',
      component: Movie 
    }
  ]
})

describe('Movie Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
    vi.setSystemTime(new Date('2024-01-01T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const makeSut = async (options = {}) => {
    const store = useMovieStore()
    
    Object.assign(store, {
      currentMovie: mockMovie,
      loading: false,
      error: null,
      ...options
    })
    
    const fetchMovieDetailsSpy = vi.spyOn(store, 'fetchMovieDetails')
    fetchMovieDetailsSpy.mockImplementation(() => Promise.resolve())
    
    await router.push('/movie/1')
    await router.isReady()
    
    const wrapper = mount(Movie, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: true
        }
      }
    })

    await nextTick()
    
    return {
      wrapper,
      store,
      fetchMovieDetailsSpy
    }
  }

  it('fetches movie details on mount', async () => {
    const { fetchMovieDetailsSpy } = await makeSut()
    expect(fetchMovieDetailsSpy).toHaveBeenCalledWith('1')
  })

  it('displays movie details correctly', async () => {
    const { wrapper } = await makeSut()
    
    expect(wrapper.find('[data-test="movie-title"]').text()).toBe(mockMovie.title)
    expect(wrapper.find('[data-test="movie-overview"]').text()).toBe(mockMovie.overview)
    expect(wrapper.find('[data-test="movie-score"]').text()).toBe('75%')
  })

  it('shows loading state', async () => {
    const { wrapper } = await makeSut({ loading: true })
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true)
  })

  it('shows error message when fetch fails', async () => {
    const { wrapper } = await makeSut({ error: 'Failed to fetch movie details' })
    expect(wrapper.find('[data-test="error"]').text()).toBe('Failed to fetch movie details')
  })

  it('formats release date correctly', async () => {
    const { wrapper } = await makeSut()
    expect(wrapper.find('[data-test="release-date"]').text()).toBe('Jan 1, 2024')
  })
}) 
