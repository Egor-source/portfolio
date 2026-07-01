import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <section className="relative w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-brand-bg text-white overflow-hidden px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full mix-blend-screen filter blur-[100px] sm:blur-[130px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-purple) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-md flex flex-col items-center">
        <div className="relative mb-4 select-none">
          <h1 className="text-8xl sm:text-9xl font-extrabold font-sans tracking-widest text-white drop-shadow-[0_0_35px_rgba(93,62,248,0.3)] animate-pulse">
            404
          </h1>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-sans mb-3 tracking-tight">
          {t('404.title')}
        </h2>

        <p className="text-sm sm:text-base text-muted mb-8 leading-relaxed">{t('404.message')}</p>

        <Link
          to="/"
          className="inline-flex justify-center items-center gap-2 bg-brand-surface border border-brand-border hover:border-accent-purple/50 text-white font-medium px-6 py-3 rounded-brand-sm text-sm transition-all duration-200 cursor-pointer active:scale-[0.98] group"
        >
          <svg
            className="w-4 h-4 text-muted group-hover:text-white group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7M3 12h18"
            />
          </svg>
          {t('404.back')}
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
