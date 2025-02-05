import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default-layout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' }
    },
    {
      path: '/search',
      component: { template: '<div>Search</div>' }
    }
  ]
})

describe('DefaultLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('handles search when button is clicked', async () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        plugins: [router]
      }
    })

    const input = wrapper.find('input')
    await input.setValue('test movie')
    
    const button = wrapper.find('button')
    await button.trigger('click')
    
    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(router.currentRoute.value.path).toBe('/search')
    expect(router.currentRoute.value.query).toEqual({ q: 'test movie' })
  })
})
