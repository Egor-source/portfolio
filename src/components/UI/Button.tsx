import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const Button: FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'border border-violet-600 bg-violet-600 text-white hover:bg-violet-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white',
  }

  return (
    <button
      className={clsx(
        className,
        'rounded-lg px-4 py-2 font-medium transition active:scale-[0.98] text-sm cursor-pointer',
        variants[variant]
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
