export interface ProjectLocale {
  id: string
  title: string
  description: string
}

export interface ProjectData {
  id: string
  tags: string[]
  img: string
  category: string
  link?: string
  github?: string
}

export type ProjectItem = ProjectLocale & ProjectData
