import { useState, useEffect, useRef } from 'react'
import { SelectContext, type SelectProps } from './types'
import ArrowIcon from '@/assets/icons/arrow.svg?react'

export function Select<T extends string | number>({
  children,
  value,
  onChange,
  placeholder = 'Select...',
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (selectedValue: T) => {
    onChange(selectedValue)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value, handleSelect }}>
      <div className="relative inline-block text-left text-white border-white" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 border border-brand-border bg-brand-surface hover:border-accent-purple/50 px-3 py-1.5 rounded-brand-sm text-sm font-medium transition-colors duration-200 cursor-pointer"
        >
          <span>{value || placeholder}</span>
          <ArrowIcon
            className={`w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <ul className="w-full absolute right-0 mt-2 bg-brand-surface border border-brand-border rounded-brand-sm shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1 duration-100">
            {children}
          </ul>
        )}
      </div>
    </SelectContext.Provider>
  )
}
