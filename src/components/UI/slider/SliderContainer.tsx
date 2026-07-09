import {
  Children,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import clsx from 'clsx'
import type { SliderContainerProps } from './types.ts'

const HIDE_DELAY = 3000

const SliderContainer: FC<SliderContainerProps> = ({ children, lazy = false }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)
  const count = Children.count(children)
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0, 1, count - 1]))

  const sliderRef = useRef<HTMLDivElement>(null)

  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)
  const hideTimer = useRef<number | null>(null)

  const showControls = useCallback(() => {
    setControlsVisible(true)

    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
    }

    hideTimer.current = window.setTimeout(() => {
      setControlsVisible(false)
    }, HIDE_DELAY)
  }, [])

  const hideControls = useCallback(() => {
    setControlsVisible(false)

    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  useEffect(() => {
    if (count > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      showControls()
    }

    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
      }
    }
  }, [count, showControls])

  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      if (!sliderRef.current?.contains(e.target as Node)) {
        hideControls()
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
    }
  }, [hideControls])

  const goTo = (index: number) => {
    showControls()

    const nextIndex = index < 0 ? count - 1 : index >= count ? 0 : index

    setLoadedSlides((prev) => {
      const next = new Set(prev)
      next.add(nextIndex)
      return next
    })

    setActiveSlideIndex(nextIndex)
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (count <= 1) return

    showControls()

    isDragging.current = true
    startX.current = e.clientX
    currentX.current = e.clientX
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!isDragging.current) {
      showControls()
      return
    }

    currentX.current = e.clientX
  }

  const onPointerUp = () => {
    if (!isDragging.current) return

    const diff = currentX.current - startX.current
    const threshold = 50

    if (diff > threshold) {
      goTo(activeSlideIndex - 1)
    } else if (diff < -threshold) {
      goTo(activeSlideIndex + 1)
    }

    isDragging.current = false
    startX.current = 0
    currentX.current = 0
  }

  const renderChild = (index: number) => {
    return (
      !lazy ||
      index === activeSlideIndex ||
      loadedSlides.has(index) ||
      index === (activeSlideIndex + 1) % count ||
      index === (activeSlideIndex - 1 + count) % count
    )
  }

  return (
    <div
      ref={sliderRef}
      className="relative w-full bg-brand-surface border border-brand-border rounded-brand overflow-hidden mb-10 group/slider"
    >
      <div
        className="relative overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className={clsx('relative', {
            'cursor-grab': count > 1,
          })}
        >
          {Children.map(children, (child, index) => (
            <div
              key={index}
              className={clsx(
                'transition-opacity duration-500 ease-in-out',
                index === activeSlideIndex
                  ? 'relative opacity-100 z-10'
                  : 'absolute inset-0 opacity-0 pointer-events-none z-0'
              )}
            >
              {renderChild(index) && child}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            onClick={() => goTo(activeSlideIndex - 1)}
            className={clsx(
              'absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-brand-bg/80 border border-brand-border text-white flex items-center justify-center backdrop-blur-sm hover:bg-brand-surface transition-all duration-300 cursor-pointer',
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            ←
          </button>

          <button
            onClick={() => goTo(activeSlideIndex + 1)}
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-brand-bg/80 border border-brand-border text-white flex items-center justify-center backdrop-blur-sm hover:bg-brand-surface transition-all duration-300 cursor-pointer',
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            →
          </button>
        </>
      )}

      {count > 1 && (
        <div
          className={clsx(
            'absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-brand-bg/60 px-3 py-1.5 rounded-full backdrop-blur-xs transition-all duration-300',
            controlsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          )}
        >
          {Children.map(children, (_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={clsx(
                'h-2 rounded-full transition-all cursor-pointer',
                idx === activeSlideIndex ? 'w-4 bg-accent-purple' : 'w-2 bg-muted/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SliderContainer
