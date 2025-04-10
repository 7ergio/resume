import resumeData from '~/public/data/resume.json'

interface ResumeData {
  personal: {
    name: string
    title: string
    location: string
    phone: string
    email: string
    linkedin: string
    github: string
    summary: string
  }
  experience: Array<{
    company: string
    position: string
    period: string
    description: string
    achievements: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    period: string
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
  languages: Array<{
    name: string
    level: string
  }>
  hobbies: string
}

export const useResumeData = (): ResumeData => {
  return resumeData as ResumeData
}