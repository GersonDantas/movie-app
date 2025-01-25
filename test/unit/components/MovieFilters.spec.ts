import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieFilters from '@/components/MovieFilters.vue'

interface SutTypes {
  wrapper: ReturnType<typeof mount<typeof MovieFilters>>
}

const mockData = {
  years: Array.from({ length: 24 }, (_, i) => 2024 - i),
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' }
  ],
  sortOptions: [
    'popularity',
    'rating',
    'date'
  ]
}

const makeSut = (): SutTypes => {
  const wrapper = mount(MovieFilters, {
    data() {
      return {
        years: mockData.years,
        filters: {
          sortBy: 'popularity',
          genre: '',
          year: ''
        }
      }
    }
  })

  return { wrapper }
}

describe('MovieFilters', () => {
  it('emits filter event when selections change', async () => {
    const { wrapper } = makeSut()
    
    await wrapper.vm.$nextTick()

    const select = wrapper.find('[data-testid="genre-select"]')
    await select.setValue('28')
    await select.trigger('change')
    
    const emitted = wrapper.emitted()
    expect(emitted.filter).toBeTruthy()
    expect(emitted.filter[0]).toEqual([{
      sortBy: 'popularity',
      genre: '28',
      year: ''
    }])
  })

  it('shows all available filter options', async () => {
    const { wrapper } = makeSut()
    
    await wrapper.vm.$nextTick()

    const genreOptions = wrapper.find('[data-testid="genre-select"]').findAll('option')
    expect(genreOptions.length).toBe(4)

    const sortOptions = wrapper.find('[data-testid="sort-select"]').findAll('option')
    expect(sortOptions.length).toBe(3)

    const yearOptions = wrapper.find('[data-testid="year-select"]').findAll('option')
    expect(yearOptions.length).toBe(mockData.years.length + 1)
  })
}) 
