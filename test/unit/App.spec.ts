import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import App from '@/App.vue'
import { useMovieStore } from '@/store/movie-store'
import { RouterView } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home Page</div>' }
    },
    {
      path: '/search',
      component: { template: '<div>Search Page</div>' }
    },
    {
      path: '/movie/:id',
      component: { template: '<div>Movie Details</div>' }
    }
  ]
})

const makeSut = async () => {
  setActivePinia(createPinia())
  const store = useMovieStore()
  vi.spyOn(store, 'fetchTrending').mockImplementation(() => Promise.resolve())

  const wrapper = mount(App, {
    global: {
      plugins: [router],
      stubs: {
        RouterView
      }
    }
  })

  await router.isReady()

  return { wrapper, store }
}

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches trending movies on mount', async () => {
    const { store } = await makeSut()
    expect(store.fetchTrending).toHaveBeenCalled()
  })

  it('renders with correct base styles', async () => {
    const { wrapper } = await makeSut()
    expect(wrapper.find('div').classes()).toContain('min-h-screen')
    expect(wrapper.find('div').classes()).toContain('bg-gray-900')
  })

  it('handles route navigation correctly', async () => {
    await makeSut()
    
    expect(router.currentRoute.value.path).toBe('/')
    
    await router.push('/search')
    expect(router.currentRoute.value.path).toBe('/search')
    
    await router.push('/movie/1')
    expect(router.currentRoute.value.path).toBe('/movie/1')
  })

  it('has transition setup for route changes', async () => {
    const { wrapper } = await makeSut()
    
    await wrapper.vm.$nextTick()
    
    const routerView = wrapper.findComponent(RouterView)
    expect(routerView.exists()).toBe(true)
    
    const template = wrapper.html()
    expect(template).toContain('<transition')
    expect(template).toContain('name="fade"')
    expect(template).toContain('mode="out-in"')
  })
}) 
