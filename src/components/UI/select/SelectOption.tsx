import { useContext } from 'react'
import { SelectContext, type OptionProps } from './types'

export function SelectOption<T extends string | number>({ value, children }: OptionProps<T>) {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('Option must be used inside a Select component')
  }

  const isSelected = context.value === value

  return (
    <li>
      <button
        type="button"
        onClick={() => context.handleSelect(value)}
        data-selected={isSelected ? '' : undefined}
        className="w-full text-left px-4 py-2 text-sm text-muted hover:bg-brand-border hover:text-white data-[selected]:bg-accent-purple data-[selected]:text-white transition-colors duration-150 cursor-pointer"
      >
        {children || value}
      </button>
    </li>
  )
}
