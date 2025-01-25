import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { Progress } from '@/components/ui/progress'

interface ProgressProps {
  modelValue?: number
  class?: string
}

interface SutTypes {
  wrapper: VueWrapper
}

const makeSut = (props: Partial<ProgressProps> = {}): SutTypes => {
  const wrapper = mount(Progress, {
    props: {
      modelValue: 50,
      ...props
    }
  })

  return { wrapper }
}

describe('Progress Component', () => {
  it('renders correctly', () => {
    const { wrapper } = makeSut()
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('shows correct progress value', () => {
    const { wrapper } = makeSut({ modelValue: 75 })
    const indicator = wrapper.find('.bg-primary')
    expect(indicator.attributes('style')).toContain('transform: translateX(-25%)')
  })

  it('applies custom classes', () => {
    const { wrapper } = makeSut({ 
      modelValue: 50,
      class: 'custom-class'
    })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('defaults to 0 progress when no value provided', () => {
    const { wrapper } = makeSut({ modelValue: undefined })
    const indicator = wrapper.find('.bg-primary')
    expect(indicator.attributes('style')).toContain('transform: translateX(-100%)')
  })

  it('clamps progress value between 0 and 100', () => {
    const { wrapper: wrapperMax } = makeSut({ modelValue: 100 })
    expect(wrapperMax.find('.bg-primary').attributes('style')).toContain('transform: translateX(-0%)')

    const { wrapper: wrapperMin } = makeSut({ modelValue: 0 })
    expect(wrapperMin.find('.bg-primary').attributes('style')).toContain('transform: translateX(-100%)')
  })
}) 
