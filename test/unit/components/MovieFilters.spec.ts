import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieFilters from '@/components/MovieFilters.vue'
import { useMovieStore } from '@/store/movie-store'

interface SutTypes {
  wrapper: ReturnType<typeof mount<typeof MovieFilters>>
  store: ReturnType<typeof useMovieStore>
}

const mockData = {
  years: Array.from({ length: 24 }, (_, i) => 2024 - i),
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' }
  ],
  sortOptions: [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'date', label: 'Release Date' }
  ]
}

const makeSut = (): SutTypes => {
  setActivePinia(createPinia())
  const store = useMovieStore()
  store.genres = mockData.genres

  const wrapper = mount(MovieFilters, {
    global: {
      plugins: [createPinia()]
    }
  })

  return { wrapper, store }
}

describe('MovieFilters', () => {
  it('emits filter event when genre changes', async () => {
    const { wrapper } = makeSut()
    
    await wrapper.vm.$nextTick()

    // Simula a mudança do valor diretamente no select de gênero
    const genreSelect = wrapper.findAllComponents({ name: 'Select' })[1] // O segundo Select é o de gênero
    await genreSelect.vm.$emit('update:modelValue', '28')
    
    // Verifica se o evento filter foi emitido
    const emitted = wrapper.emitted('filter')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0][0]).toEqual({
      sortBy: 'popularity',
      genre: '28',
      year: ''
    })
  })

  it('shows all available filter options', async () => {
    const { wrapper } = makeSut()
    
    await wrapper.vm.$nextTick()

    const genreSelect = wrapper.find('[data-testid="genre-select"]')
    expect(genreSelect.exists()).toBe(true)

    const yearSelect = wrapper.find('[data-testid="year-select"]')
    expect(yearSelect.exists()).toBe(true)

    const sortSelect = wrapper.find('[data-testid="sort-select"]')
    expect(sortSelect.exists()).toBe(true)
  })
}) 
