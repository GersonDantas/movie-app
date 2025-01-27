import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import Search from '@/pages/Search/index.vue'
import { useMovieStore } from '@/store/movie-store'

const mockMovies = [
  {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    release_date: '2024-01-01',
    vote_average: 7.5,
    overview: 'Test overview'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/search', component: Search },
    { path: '/movie/:id', component: { template: '<div>Movie</div>' } }
  ]
})

const makeSut = (options = {}) => {
  setActivePinia(createPinia())
  const store = useMovieStore()
  
  // Configure o estado inicial da store
  Object.assign(store, {
    searchResults: mockMovies,
    loading: false,
    error: null,
    ...options
  })
  
  vi.spyOn(store, 'searchMovies').mockImplementation(() => Promise.resolve())
  
  const wrapper = mount(Search, {
    global: {
      plugins: [router]
    }
  })

  return { wrapper, store }
}

describe('Search Component', () => {
  it('renders search results correctly', () => {
    const { wrapper } = makeSut()

    const movieCards = wrapper.findAll('.movie-card')
    expect(movieCards.length).toBe(mockMovies.length)
    
    const firstMovie = movieCards[0]
    expect(firstMovie.find('h3').text()).toBe('Test Movie')
    expect(firstMovie.find('img').attributes('src'))
      .toBe('https://image.tmdb.org/t/p/w500/test.jpg')
  })

  it('shows loading state', async () => {
    const { wrapper } = makeSut({ loading: true })
    await wrapper.vm.$nextTick() // Aguarde a atualização do DOM
    
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true)
  })

  it('shows error message when search fails', async () => {
    const { wrapper } = makeSut({ error: 'Failed to search movies' })
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('[data-test="error"]').text()).toBe('Failed to search movies')
  })

  it('shows no results message when search returns empty', async () => {
    const { wrapper } = makeSut({ searchResults: [] })
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('[data-test="no-results"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="no-results"]').text()).toContain('No results found')
  })

  it('searches movies when query param changes', async () => {
    const { store } = makeSut()

    await router.push({ path: '/search', query: { q: 'test movie' }})
    
    expect(store.searchMovies).toHaveBeenCalledWith('test movie', 1)
  })
}) 
