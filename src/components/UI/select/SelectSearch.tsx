import { useContext } from 'react'
import { SelectContext, type SelectSearchProps } from './types.ts'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@/assets/icons/search.svg?react'

const SelectSearch = ({ value, onChange }: SelectSearchProps) => {
  const context = useContext(SelectContext)
  const { t } = useTranslation()
  if (!context) {
    throw new Error('Search must be used inside a Select component')
  }

  return (
    <li className="px-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-muted">
          <SearchIcon className="w-4 h-4 " />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full bg-brand-surface py-2 pl-7 pr-4 text-sm text-white placeholder-muted focus:outline-none  transition-all"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 flex items-center text-muted hover:text-white cursor-pointer text-xs"
          >
            ✕
          </button>
        )}
      </div>
    </li>
  )
}

export default SelectSearch
