import { describe, it, expect } from 'vitest'
import { useResumeData } from '../../composables/useResumeData'

describe('useResumeData', () => {
  it('returns all top-level keys', () => {
    const data = useResumeData()
    expect(data.personal).toBeDefined()
    expect(data.experience).toBeDefined()
    expect(data.education).toBeDefined()
    expect(data.skills).toBeDefined()
    expect(data.languages).toBeDefined()
    expect(data.hobbies).toBeDefined()
  })

  it('returns personal info with required fields', () => {
    const { personal } = useResumeData()
    expect(typeof personal.name).toBe('string')
    expect(typeof personal.title).toBe('string')
    expect(typeof personal.email).toBe('string')
    expect(typeof personal.location).toBe('string')
    expect(personal.name.length).toBeGreaterThan(0)
    expect(personal.email).toContain('@')
  })

  it('returns experience as a non-empty array with required fields', () => {
    const { experience } = useResumeData()
    expect(Array.isArray(experience)).toBe(true)
    expect(experience.length).toBeGreaterThan(0)
    experience.forEach(job => {
      expect(typeof job.company).toBe('string')
      expect(typeof job.position).toBe('string')
      expect(typeof job.period).toBe('string')
      expect(Array.isArray(job.achievements)).toBe(true)
    })
  })

  it('returns skills as a non-empty array with category and items', () => {
    const { skills } = useResumeData()
    expect(Array.isArray(skills)).toBe(true)
    expect(skills.length).toBeGreaterThan(0)
    skills.forEach(category => {
      expect(typeof category.category).toBe('string')
      expect(Array.isArray(category.items)).toBe(true)
      expect(category.items.length).toBeGreaterThan(0)
    })
  })

  it('returns languages as a non-empty array with name and level', () => {
    const { languages } = useResumeData()
    expect(Array.isArray(languages)).toBe(true)
    expect(languages.length).toBeGreaterThan(0)
    languages.forEach(lang => {
      expect(typeof lang.name).toBe('string')
      expect(typeof lang.level).toBe('string')
    })
  })

  it('returns hobbies as a non-empty string', () => {
    const { hobbies } = useResumeData()
    expect(typeof hobbies).toBe('string')
    expect(hobbies.length).toBeGreaterThan(0)
  })
})
