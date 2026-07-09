import type { ReactNode } from 'react'

export interface SliderContainerProps {
  children: ReactNode
  lazy?: boolean
}

export interface SlideProps {
  children: ReactNode
  className?: string
}
