import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import projectsData from '../data/projects.json'
import { Link, useParams } from 'react-router'
import type { ProjectItem, ProjectLocale } from '../components/projects/types.ts'
import CodeIcon from '@/assets/icons/code.svg?react'
import DemoModal from '../components/projects/DemoModal.tsx'
import OpenInBrowserIcon from '@/assets/icons/open-in-browser.svg?react'
import SliderContainer from '../components/UI/slider/SliderContainer.tsx'
import Slide from '../components/UI/slider/Slide.tsx'
import ReactMarkdown from 'react-markdown'
import { ScrollToTop } from '../components/ScrollToTop.tsx'

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('projects')
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const projectsLocales = t('list', { returnObjects: true }) as ProjectLocale[]
  const project: ProjectItem | undefined = projectsLocales
    .map((projectLocale: ProjectLocale) => {
      const data = projectsData.find(({ id }) => id === projectLocale.id)
      if (!data) {
        throw new Error(`No data found for ${projectLocale.id} project`)
      }
      return {
        ...data,
        ...projectLocale,
      }
    })
    .find((project) => project.id === id)

  if (!project) {
    return (
      <div className="w-full flex justify-center items-center flex-1 flex-col">
        <p className="text-muted mb-4">{t('projectNotFound')}</p>
        <Link to="/projects" className="text-accent-purple hover:underline">
          {t('backToProjects')}
        </Link>
      </div>
    )
  }

  const sliderImages = project.images && project.images.length > 0 ? project.images : [project.img]

  return (
    <>
      <ScrollToTop />
      <section className="w-full flex justify-center flex-1 relative">
        <div className="max-w-7xl px-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8 group"
          >
            <span>←</span>
            {t('backToProjects')}
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-8">
            {project.title}
          </h1>

          <div className="w-full max-w-4xl mx-auto">
            <SliderContainer>
              {sliderImages.map((src, index) => (
                <Slide className="max-w-4xl" key={`${src}-${index}`}>
                  <img
                    src={src}
                    key={index}
                    alt={`${project.title} screenshot ${index + 1}`}
                    draggable="false"
                    className="w-full h-full object-cover object-top aspect-[16/9]"
                  />
                </Slide>
              ))}
            </SliderContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-bold font-sans border-b border-brand-border/40 pb-2">
                {t('aboutProject')}
              </h2>
              <ReactMarkdown>{project.fullDescription || project.description}</ReactMarkdown>
            </div>

            <div className="space-y-8">
              <div className="bg-brand-surface/40 border border-brand-border/60 p-5 rounded-brand">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
                  {t('technologies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-accent-blue bg-accent-blue-muted px-2.5 py-1 rounded-brand-sm border border-accent-blue/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-brand-surface/40 border border-brand-border/60 p-5 rounded-brand space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-2">
                  {t('resources')}
                </h3>

                {project.demo && (
                  <button
                    className="w-full cursor-pointer flex items-center justify-between p-3 rounded-brand-sm bg-accent-purple/10 border border-accent-purple/30 hover:bg-accent-purple/20 text-accent-purple-light font-medium text-sm transition-colors group"
                    onClick={() => setIsDemoModalOpen(true)}
                  >
                    <span>{t('liveDemo')}</span>
                    <OpenInBrowserIcon
                      className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform fill-accent-purple-light"
                      stroke="currentColor"
                    />
                  </button>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-brand-sm bg-brand-bg border border-brand-border hover:border-muted text-white text-sm transition-colors"
                  >
                    <span>{t('viewCode')}</span>
                    <CodeIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        {project.demo && (
          <DemoModal
            title={project.title}
            youtube={project.demo?.youtube}
            vk={project.demo?.vk}
            isOpen={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
          />
        )}
      </section>
    </>
  )
}

export default ProjectDetailPage
