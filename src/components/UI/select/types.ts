import { createContext, type ReactNode } from 'react'

export interface SelectContextType<T> {
  value: T
  handleSelect: (value: T) => void
}

export const SelectContext = createContext<SelectContextType<any> | null>(null)

export interface SelectProps<T> {
  children: ReactNode
  value: T
  onChange: (value: T, type?: string) => void
  placeholder?: string
}

export interface MultiSelectProps<T> extends Omit<SelectProps<T>, 'value'> {
  value: T[]
}

export interface OptionProps<T> {
  value: T
  children?: ReactNode
}

export interface SelectSearchProps {
  value: string
  onChange: (value: string) => void
}
