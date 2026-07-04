import { useTranslation } from 'react-i18next'
import LanguageSelect from './LanguageSelect.tsx'
import Button from '../UI/Button.tsx'
import LayoutNav from './LayoutNav.tsx'
import ContactModal from './ContactModal.tsx'
import { useState } from 'react'
import { Link } from 'react-router'

const LayoutHeader = () => {
  const { t } = useTranslation()
  const [isContactOpen, setIsContactOpen] = useState(false)
  return (
    <header className="w-full flex justify-center bg-brand-bg border-b border-brand-border sticky top-0 z-40 backdrop-blur-md bg-brand-bg/90">
      <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center">
        <Link
          to="/"
          className="flex items-center gap-1 group text-white font-sans text-2xl font-bold tracking-tight mr-8"
          aria-label="AS Portfolio Home"
        >
          <span>E</span>
          <span className="text-accent-purple transition-colors">K</span>
        </Link>

        <div className="flex-1 md:flex md:justify-center">
          <LayoutNav />
        </div>

        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <LanguageSelect />

          <Button onClick={() => setIsContactOpen(true)}>{t('contactMe')}</Button>
        </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  )
}

export default LayoutHeader
