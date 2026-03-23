import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { ref, reactive, onMounted } from 'vue'

// Stub Nuxt auto-imports
vi.stubGlobal('ref', ref)
vi.stubGlobal('reactive', reactive)
vi.stubGlobal('onMounted', onMounted)
vi.stubGlobal('useRuntimeConfig', () => ({
  public: {
    emailJsPublicKey: 'test-key',
    emailJsServiceId: 'test-service',
    emailJsTemplateId: 'test-template'
  }
}))
vi.stubGlobal('useResumeData', () => ({
  personal: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    title: '',
    summary: ''
  }
}))

vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn().mockResolvedValue({ status: 200, text: 'OK' })
  }
}))

import ContactForm from '../../components/ContactForm.vue'

describe('ContactForm validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form with all fields', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('#name').exists()).toBe(true)
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#message').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows all required errors on empty submission', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Name is required')
    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Message is required')
  })

  it('shows error when name is too short', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#name').setValue('A')
    await wrapper.find('#name').trigger('blur')
    expect(wrapper.text()).toContain('Name must be at least 2 characters')
  })

  it('shows error for invalid email', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#email').setValue('not-an-email')
    await wrapper.find('#email').trigger('blur')
    expect(wrapper.text()).toContain('Please enter a valid email address')
  })

  it('shows error when message is too short', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#message').setValue('Hi!')
    await wrapper.find('#message').trigger('blur')
    expect(wrapper.text()).toContain('Message must be at least 10 characters')
  })

  it('clears errors when valid values are entered', async () => {
    const wrapper = mount(ContactForm)
    // Trigger errors first
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Name is required')

    // Fix all fields
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#name').trigger('input')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#email').trigger('input')
    await wrapper.find('#message').setValue('Hello, this is a test message.')
    await wrapper.find('#message').trigger('input')

    expect(wrapper.text()).not.toContain('Name is required')
    expect(wrapper.text()).not.toContain('Email is required')
    expect(wrapper.text()).not.toContain('Message is required')
  })

  it('error messages have role="alert" for accessibility', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('form').trigger('submit')
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts.length).toBeGreaterThanOrEqual(3)
  })

  it('shows success message after successful submission', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#message').setValue('Hello, this is a test message.')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Message sent successfully!')
  })
})
