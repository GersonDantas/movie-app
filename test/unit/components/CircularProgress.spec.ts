import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CircularProgress from '@/components/CircularProgress.vue'

interface SutTypes {
  wrapper: ReturnType<typeof mount<typeof CircularProgress>>
}

const makeSut = (props = {}): SutTypes => {
  const wrapper = mount(CircularProgress, {
    props: {
      value: 75,
      ...props
    }
  })

  return { wrapper }
}

describe('CircularProgress', () => {
  it('renders correctly', () => {
    const { wrapper } = makeSut()
    expect(wrapper.find('[data-testid="circular-progress"]').exists()).toBe(true)
  })

  it('displays correct percentage', () => {
    const { wrapper } = makeSut({ value: 75 })
    expect(wrapper.find('[data-testid="progress-value"]').text()).toBe('75%')
  })

  it('clamps value between 0 and 100', () => {
    const { wrapper: wrapperOver } = makeSut({ value: 120 })
    expect(wrapperOver.find('[data-testid="progress-value"]').text()).toBe('100%')

    const { wrapper: wrapperUnder } = makeSut({ value: -20 })
    expect(wrapperUnder.find('[data-testid="progress-value"]').text()).toBe('0%')
  })

  it('applies different colors based on value', async () => {
    const { wrapper: goodScore } = makeSut({ value: 75 })
    const { wrapper: mediumScore } = makeSut({ value: 45 })
    const { wrapper: badScore } = makeSut({ value: 30 })

    expect(goodScore.html()).toContain('bg-green-500')
    expect(mediumScore.html()).toContain('bg-yellow-500')
    expect(badScore.html()).toContain('bg-red-500')
  })
}) 
