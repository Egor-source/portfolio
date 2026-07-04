import { type FC, type HTMLProps, type ReactNode } from 'react'
import clsx from 'clsx'

interface TagProps extends HTMLProps<HTMLSpanElement> {
  children: ReactNode
}

const Tag: FC<TagProps> = ({ children, className, ...props }) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'text-[11px] font-semibold tracking-wide uppercase text-accent-blue bg-accent-blue-muted px-2.5 py-0.5 rounded-brand-sm border border-accent-blue/10 select-none'
      )}
    >
      {children}
    </span>
  )
}

export default Tag
