import {
  Children,
  isValidElement,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { type MultiSelectProps, SelectContext } from './types'
import Tag from '../Tag.tsx'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import CloseSmallIcon from '@/assets/icons/close-small.svg?react'
import EmptySelectOption from './EmptySelectOption.tsx'
import SelectSearch from './SelectSearch.tsx'

export function MultiSelect<T extends string | number>({
  children,
  value,
  onChange,
  placeholder = 'Select...',
}: MultiSelectProps<T>) {
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
    onChange(selectedValue, 'select')
    setIsOpen(false)
  }

  const handleUnselect = (e: ReactMouseEvent<HTMLSpanElement>, selectedValue: T) => {
    e.stopPropagation()
    onChange(selectedValue, 'unselect')
  }

  const options = (() => {
    if (Children.count(children) === 0) {
      return <EmptySelectOption />
    }

    const childrenArray = Children.toArray(children)

    const onlySearchInput =
      childrenArray.length === 1 &&
      isValidElement(childrenArray[0]) &&
      childrenArray[0].type === SelectSearch

    return (
      <>
        {children}
        {onlySearchInput && <EmptySelectOption />}
      </>
    )
  })()

  return (
    <SelectContext.Provider value={{ value, handleSelect }}>
      <div
        className="relative w-full inline-block text-left text-white border-white"
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 border border-brand-border bg-brand-surface hover:border-accent-purple/50 px-3 py-1.5 rounded-brand-sm text-sm font-medium transition-colors duration-200 cursor-pointer"
        >
          {value.length === 0 ? (
            <span className="text-muted text-sm leading-relaxed line-clamp-3 font-normal ">
              {placeholder}
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {value.map((value) => (
                <Tag
                  key={value}
                  onClick={(e) => handleUnselect(e, value)}
                  className="hover:bg-accent-blue/15 hover:border-accent-blue/20 active:scale-95 transition-all"
                >
                  <span className="inline-flex gap-0.5 items-center">
                    <span>{value}</span>
                    <CloseSmallIcon className="w-4 h-4 mr-[-8px] pointer-events-none" />
                  </span>
                </Tag>
              ))}
            </div>
          )}
          <div className="w-4 h-4 flex items-center justify-center">
            <ArrowIcon
              className={` text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <ul className="w-full absolute right-0 mt-2 bg-brand-surface border border-brand-border rounded-brand-sm shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1 duration-100">
            {options}
          </ul>
        )}
      </div>
    </SelectContext.Provider>
  )
}
