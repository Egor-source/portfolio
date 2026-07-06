import { Children, type FC, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { SliderContainerProps } from './types.ts'
import clsx from 'clsx'

const SliderContainer: FC<SliderContainerProps> = ({ children }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const count = Children.count(children)

  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)

  const goTo = (index: number) => {
    setActiveSlideIndex(() => {
      if (index < 0) return count - 1
      if (index > count - 1) return 0
      return index
    })
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!isDragging.current) return
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

  return (
    <div className="relative w-full bg-brand-surface border border-brand-border rounded-brand overflow-hidden mb-10 group/slider">
      <div
        className="relative w-full overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className={clsx('flex h-full transition-transform duration-300 ease-out', {
            'cursor-grab': count > 1,
          })}
          style={{
            transform: `translateX(-${activeSlideIndex * 100}%)`,
            width: `${count * 100}%`,
            touchAction: 'pan-y',
          }}
        >
          {children}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            onClick={() => goTo(activeSlideIndex - 1 < 0 ? count - 1 : activeSlideIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-bg/80 border border-brand-border text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hover:bg-brand-surface"
          >
            ←
          </button>

          <button
            onClick={() => goTo(activeSlideIndex + 1 > count ? 0 : activeSlideIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-bg/80 border border-brand-border text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hover:bg-brand-surface"
          >
            →
          </button>
        </>
      )}

      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-brand-bg/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
          {Children.map(children, (_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                idx === activeSlideIndex ? 'bg-accent-purple w-4' : 'bg-muted/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SliderContainer
