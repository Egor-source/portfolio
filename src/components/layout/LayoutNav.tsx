import { useState } from 'react'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'

const LayoutNav = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/projects', label: t('nav.projects') },
    // { to: '/experience', label: t('nav.experience') },
    // { to: '/case-studies', label: t('nav.caseStudies') },
    // { to: '/tech-stack', label: t('nav.techStack') },
    // { to: '/about', label: t('nav.about') },
  ]

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center h-full text-sm font-medium text-muted hover:text-white transition-colors duration-200 py-2 tracking-wide cursor-pointer select-none ${
      isActive
        ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-purple after:rounded-full'
        : ''
    }`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative block w-full text-left py-4 px-6 text-lg font-medium text-muted hover:text-white hover:bg-brand-surface/50 transition-all ${
      isActive ? 'text-white font-semibold bg-brand-surface border-l-4 border-accent-purple' : ''
    }`

  return (
    <>
      <nav className="hidden md:block h-full" aria-label="Main Navigation">
        <ul className="flex items-center gap-7 h-full">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={desktopLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative cursor-pointer text-white"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span
          className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 top-20 bg-brand-bg/95 backdrop-blur-lg z-40 md:hidden animate-in fade-in slide-in-from-top-5 duration-200"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="bg-brand-bg border-t border-brand-border py-4"
            aria-label="Mobile Navigation"
          >
            <ul className="flex flex-col w-full">
              {links.map((link) => (
                <li key={link.to} className="w-full">
                  <NavLink
                    to={link.to}
                    className={mobileLinkClass}
                    onClick={() => setIsOpen(false)} // Закрывать меню при переходе
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

export default LayoutNav
