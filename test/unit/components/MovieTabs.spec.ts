import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieTabs from '@/components/MovieTabs.vue'
import { useMovieStore } from '@/store/movie-store'
import { createTestingPinia } from '@pinia/testing'

interface SutTypes {
  wrapper: ReturnType<typeof mount<typeof MovieTabs>>
  store: ReturnType<typeof useMovieStore>
}

const mockSut = (): SutTypes => {
  const wrapper = mount(MovieTabs, {
    global: {
      plugins: [createTestingPinia({
        createSpy: vi.fn,
        initialState: {
          movie: {
            activeTab: 'trending'
          }
        }
      })]
    }
  })
  const store = useMovieStore()
  vi.spyOn(store, 'fetchTrending')
  vi.spyOn(store, 'fetchPopular')
  return { wrapper, store }
}

describe('MovieTabs', () => {
  it('changes tab and fetches data when clicking tabs', async () => {
    const { wrapper, store } = mockSut()

    // Click popular tab
    await wrapper.find('[data-testid="popular-tab"]').trigger('click')
    expect(store.activeTab).toBe('popular')
    expect(store.fetchPopular).toHaveBeenCalled()

    // Click trending tab
    await wrapper.find('[data-testid="trending-tab"]').trigger('click')
    expect(store.activeTab).toBe('trending')
    expect(store.fetchTrending).toHaveBeenCalled()
  })

  it('applies correct styles to active tab', async () => {
    const { wrapper, store } = mockSut()

    // Initial state
    expect(wrapper.find('[data-testid="trending-tab"]').classes()).toContain('bg-tmdb-secondary')
    expect(wrapper.find('[data-testid="popular-tab"]').classes()).toContain('bg-gray-700')

    // Change tab
    store.activeTab = 'popular'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="trending-tab"]').classes()).toContain('bg-gray-700')
    expect(wrapper.find('[data-testid="popular-tab"]').classes()).toContain('bg-tmdb-secondary')
  })
}) 
