import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import dayjs from 'dayjs'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/movie/:id',
      component: { template: '<div>Movie Details</div>' }
    }
  ]
})

interface SutTypes {
  wrapper: ReturnType<typeof mount<typeof MovieCard>>
}

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  release_date: '2024-01-01',
  vote_average: 7.5
}

const makeSut = (): SutTypes => {
  const wrapper = mount(MovieCard, {
    props: {
      movie: mockMovie
    },
    global: {
      plugins: [router],
      stubs: {
        Progress: {
          template: '<div data-testid="movie-score">{{ modelValue }}%</div>',
          props: ['modelValue']
        }
      }
    }
  })

  return { wrapper }
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    const { wrapper } = makeSut()
    
    expect(wrapper.find('[data-testid="movie-title"]').text()).toBe(mockMovie.title)
    expect(wrapper.find('[data-testid="movie-poster"]').attributes('src'))
      .toBe(`https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`)
    expect(wrapper.find('[data-testid="movie-date"]').text())
      .toBe(dayjs(mockMovie.release_date).format('MMM D, YYYY'))
  })

  it('displays correct score', () => {
    const { wrapper } = makeSut()
    expect(wrapper.find('[data-testid="movie-score"]').text()).toBe('75%')
  })

  it('links to correct movie details page', () => {
    const { wrapper } = makeSut()
    expect(wrapper.find('[data-testid="movie-card"]').attributes('href'))
      .toBe('/movie/1')
  })

  it('applies hover styles', async () => {
    const { wrapper } = makeSut()
    
    const card = wrapper.find('[data-testid="movie-card"]')
    await card.trigger('mouseenter')
    
    expect(card.classes()).toContain('group')
    expect(card.classes()).toContain('hover:scale-105')
    expect(wrapper.find('[data-testid="movie-title"]').classes())
      .toContain('group-hover:text-tmdb-secondary')
  })
}) 
