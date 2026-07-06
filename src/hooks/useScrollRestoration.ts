import { useLayoutEffect } from 'react'

export const useScrollRestoration = (key: string) => {
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(key)

    const restore = () => {
      if (saved) {
        window.scrollTo(0, Number(saved))
      }
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(restore)
    })

    let ticking = false
    let lastY = 0
    const abortController = new AbortController()

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return

        ticking = true

        requestAnimationFrame(() => {
          const y = window.scrollY

          if (Math.abs(y - lastY) > 30) {
            sessionStorage.setItem(key, String(y))
            lastY = y
          }

          ticking = false
        })
      },
      { passive: true, signal: abortController.signal }
    )

    return () => {
      abortController.abort()
    }
  }, [key])
}
