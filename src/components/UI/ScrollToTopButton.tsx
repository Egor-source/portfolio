import { useEffect, useState } from 'react'
import ArrowIcon from '@/assets/icons/arrow.svg?react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 300) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { signal: abortController.signal }
    )

    return () => {
      abortController.abort()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-brand-surface/70 border border-brand-border backdrop-blur-md text-white shadow-lg shadow-black/40 hover:border-accent-purple/50 hover:shadow-accent-purple/10 transition-all duration-300 cursor-pointer active:scale-95 group animate-in fade-in zoom-in-75 duration-200"
    >
      <ArrowIcon className="w-5 h-5 rotate-180 group-hover:fill-accent-purple-light group-hover:-translate-y-0.5 transition-all" />
    </button>
  )
}

export default ScrollToTopButton
