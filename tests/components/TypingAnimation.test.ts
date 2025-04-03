import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TypingAnimation from '../../components/TypingAnimation.vue'

describe('TypingAnimation', () => {
  it('renders properly', () => {
    const wrapper = mount(TypingAnimation)
    expect(wrapper.find('.terminal').exists()).toBe(true)
    expect(wrapper.find('.font-mono').exists()).toBe(true)
  })

  it('has the correct structure', () => {
    const wrapper = mount(TypingAnimation)
    const terminal = wrapper.find('.terminal')
    expect(terminal.exists()).toBe(true)
    expect(terminal.classes()).toContain('bg-gray-900')
    
    const typingElement = wrapper.find('.text-green-400')
    expect(typingElement.exists()).toBe(true)
  })
})