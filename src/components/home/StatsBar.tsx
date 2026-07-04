import CardTravellerIcon from '../../assets/icons/card-travaller.svg?react'
import CodeIcon from '../../assets/icons/code.svg?react'
import StackIcon from '../../assets/icons/stack.svg?react'
import TeamIcon from '../../assets/icons/team.svg?react'
import { useTranslation } from 'react-i18next'

const StatsBar = () => {
  const { t } = useTranslation()
  const stats = [
    {
      id: 'experience',
      value: '5+',
      label: t('home.statsBar.experience'),
      icon: CardTravellerIcon,
    },
    {
      id: 'projects',
      value: '20+',
      label: t('home.statsBar.projects'),
      icon: CodeIcon,
    },
    {
      id: 'role',
      value: 'Full-Stack',
      label: 'Developer',
      icon: StackIcon,
    },
    {
      id: 'companies',
      value: '5',
      label: t('home.statsBar.companies'),
      icon: TeamIcon,
    },
  ]

  return (
    <div className="w-full mx-auto bg-brand-surface border border-brand-border rounded-brand p-6 lg:py-8 lg:px-10 shadow-xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-y-0 items-center">
        {stats.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 w-full justify-start lg:justify-center relative
              ${index !== stats.length - 1 ? 'lg:after:absolute lg:after:right-0 lg:after:top-1/4 lg:after:h-1/2 lg:after:w-[1px] lg:after:bg-brand-border' : ''}
            `}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-bg border border-brand-border/40 shrink-0 select-none">
              <item.icon className="w-5 h-5 fill-accent-purple-light" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xl lg:text-2xl font-bold font-sans text-white tracking-tight leading-none mb-1">
                {item.value}
              </span>
              <span className="text-xs lg:text-sm text-muted font-normal truncate leading-tight">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsBar
