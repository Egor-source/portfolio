import { type FC } from 'react'
import type { ProjectItem } from './types.ts'
import { useTranslation } from 'react-i18next'
import CodeIcon from '@/assets/icons/code.svg?react'
import OpenInBrowserIcon from '@/assets/icons/open-in-browser.svg?react'
import Tag from '../UI/Tag.tsx'

const ProjectCard: FC<{ project: ProjectItem }> = ({ project }) => {
  const { t } = useTranslation('projects')
  return (
    <article className="flex flex-col bg-brand-surface border border-brand-border rounded-brand overflow-hidden hover:border-accent-purple/40 hover:shadow-2xl hover:shadow-accent-purple/5 transition-all duration-300 group">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-bg border-b border-brand-border/60">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 z-10" />

        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <h2 className="text-xl font-bold font-sans text-white group-hover:text-accent-purple-light transition-colors mb-2.5">
            {project.title}
          </h2>

          <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-5 border-t border-brand-border/40 pt-4 mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-white transition-colors cursor-pointer group/link"
            >
              <CodeIcon className="w-4 h-4 text-muted group-hover/link:text-white" />
              <span>{t('viewCode')}</span>
            </a>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-purple-light hover:text-white transition-colors ml-auto cursor-pointer group/link"
            >
              <span>{t('liveDemo')}</span>
              <OpenInBrowserIcon
                className="w-3.5 h-3.5 transform  group-hover/link:-translate-y-0.5 transition-transform fill-accent-purple-light"
                stroke="currentColor"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
