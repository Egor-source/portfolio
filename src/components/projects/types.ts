export interface ProjectLocale {
  id: string
  title: string
  description: string
  fullDescription: string
}

export interface ProjectData {
  id: string
  tags: string[]
  img: string
  category: string
  link?: string
  github?: string
  images?: string[]
  demo?: {
    youtube: string
    vk: string
  }
}

export type ProjectItem = ProjectLocale & ProjectData
