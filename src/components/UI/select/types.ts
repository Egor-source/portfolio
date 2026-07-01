import { createContext, type ReactNode } from 'react'

export interface SelectContextType<T> {
  value: T
  handleSelect: (value: T) => void
}

export const SelectContext = createContext<SelectContextType<any> | null>(null)

export interface SelectProps<T> {
  children: ReactNode
  value: T
  onChange: (value: T) => void
  placeholder?: string
}

export interface OptionProps<T> {
  value: T
  children?: ReactNode
}
