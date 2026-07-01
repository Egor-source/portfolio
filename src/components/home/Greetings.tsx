import Button from '../UI/Button.tsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const Greetings = () => {
  const { t, i18n } = useTranslation()

  const downloadCv = () => {
    const lang = i18n.language === 'ru-RU' ? 'ru' : 'en'
    const link = document.createElement('a')
    link.href = `/docs/cv-${lang}.pdf`
    link.download = lang === 'ru' ? 'Егор Кротов Резюме.pdf' : 'Egor Krotov CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div
        className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-purple) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full mix-blend-screen filter blur-[80px] md:blur-[100px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-blue) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 border border-brand-border bg-brand-surface/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs md:text-sm font-medium text-accent-blue mb-6 md:mb-8 animate-in fade-in slide-in-from-top-3 duration-500">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <span>{t('home.greetings.available')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight leading-[1.15] md:leading-[1.1] mb-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
          {t('home.greetings.header')}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mb-8 md:mb-10 leading-relaxed font-normal animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
          {t('home.greetings.summary')}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
          <Link to="/projects" className="w-full sm:w-auto">
            <Button className="w-full px-8 py-3.5 text-base shadow-xl shadow-accent-purple/10">
              {t('home.greetings.myProjects')}
            </Button>
          </Link>
          <Button
            className="w-full sm:w-auto px-8 py-3.5 text-base shadow-xl shadow-accent-purple/10"
            variant="outline"
            onClick={downloadCv}
          >
            {t('home.greetings.downloadCV')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Greetings
