import { useTranslation } from 'react-i18next'
import type { ProjectItem, ProjectLocale } from '../components/projects/types.ts'
import projectsData from '../data/projects.json'
import ProjectCard from '../components/projects/ProjectCard.tsx'
import ProjectsSearch from '../components/projects/ProjectsSearch.tsx'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

const ProjectsPage = () => {
  const { t } = useTranslation('projects')
  const navigate = useNavigate()
  const projectsLocales = t('list', { returnObjects: true }) as ProjectLocale[]
  const projectsList: ProjectItem[] = projectsLocales.map((projectLocale: ProjectLocale) => {
    const data = projectsData.find(({ id }) => id === projectLocale.id)
    if (!data) {
      throw new Error(`No data found for ${projectLocale.id} project`)
    }
    return {
      ...data,
      ...projectLocale,
    }
  })

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const updateCategory = (newCategory: string) => {
    setSelectedCategory(newCategory)
  }

  const updateTags = (newTags: string[]) => {
    setSelectedTags(newTags)
  }

  const filteredProjectsList = useMemo(() => {
    if (!Array.isArray(projectsList)) return []

    return projectsList
      .filter((project) => {
        return selectedCategory === 'all' || project.category === selectedCategory
      })
      .filter((project) => {
        return selectedTags.every((tag) => project.tags.includes(tag))
      })
  }, [projectsList, selectedCategory, selectedTags])

  const tagsList = useMemo(() => {
    return projectsList.reduce((acc: string[], project) => {
      project.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag)
        }
      })
      return acc
    }, [])
  }, [projectsList])

  const projects = (() => {
    if (Array.isArray(filteredProjectsList) && filteredProjectsList.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
          {filteredProjectsList.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )
    }

    return <div className="text-center">{t('noResults')}</div>
  })()

  return (
    <section className="w-full h-full flex justify-center flex-1 relative">
      <div className="w-full max-w-7xl px-6 ">
        <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl md:text-4xl font-bold font-sans tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed">{t('subtitle')}</p>
        </div>

        <ProjectsSearch
          updateCategory={updateCategory}
          updateTags={updateTags}
          tagsList={tagsList}
        />

        {projects}
      </div>
    </section>
  )
}

export default ProjectsPage
