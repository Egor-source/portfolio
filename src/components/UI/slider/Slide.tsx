import { type FC } from 'react'
import type { SlideProps } from './types.ts'
import clsx from 'clsx'

const Slide: FC<SlideProps> = ({ children, className }) => {
  return (
    <div className="w-full h-full select-none pointer-events-none flex-shrink-0">
      <div className={clsx(className, 'w-full h-full pointer-events-auto')}>{children}</div>
    </div>
  )
}

export default Slide
