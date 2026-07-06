import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiSelect } from '../UI/select/MultiSelect.tsx'
import { SelectOption } from '../UI/select/SelectOption.tsx'
import SelectSearch from '../UI/select/SelectSearch.tsx'

interface ProjectsSearchProps {
  updateCategory: (newCategory: string) => void
  updateTags: (newTags: string[]) => void
  tagsList: string[]
}

const ProjectsSearch: FC<ProjectsSearchProps> = ({ updateCategory, updateTags, tagsList }) => {
  const savedTags = sessionStorage.getItem('tags-filter')?.split('~')
  const [selectedCategory, setSelectedCategory] = useState<string>(
    sessionStorage.getItem('category-filter') || 'all'
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>(savedTags?.[0] ? savedTags : [])
  const [filteredTagsList, setFilteredTagsList] = useState(tagsList)
  const { t } = useTranslation('projects')

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'full-stack', label: t('categories.full-stack') },
    { id: 'frontend', label: t('categories.frontend') },
    { id: 'backend', label: t('categories.backend') },
  ]

  const onUpdateCategory = (id: string) => {
    setSelectedCategory(id)
    updateCategory(id)
    sessionStorage.setItem('category-filter', id)
  }

  const onUpdateTags = (tag: string, type?: string) => {
    let newTags
    setSearchQuery('')
    if (type === 'select') {
      newTags = [...selectedTags, tag]
    } else {
      newTags = selectedTags.filter((tg) => tg !== tag)
    }

    setSelectedTags(newTags)
    setFilteredTagsList(tagsList.filter((tg) => !newTags.includes(tg)))
    updateTags(newTags)
    sessionStorage.setItem('tags-filter', newTags.join('~'))
  }

  const onUpdateSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = tagsList.filter(
      (tag) =>
        tag.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) &&
        !selectedTags.includes(tag)
    )

    setFilteredTagsList(filtered)
  }

  useEffect(() => {
    updateTags(selectedTags)
    updateCategory(selectedCategory)
  }, [])

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-border/40 animate-in fade-in slide-in-from-top-4 duration-600 delay-100">
      <div className="flex flex-wrap gap-1.5 bg-brand-surface/50 border border-brand-border/60 p-1 rounded-xl w-full md:w-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onUpdateCategory(cat.id)}
            className={`px-4 py-2 text-xs md:text-sm font-medium rounded-brand-sm transition-[color] cursor-pointer select-none
                  ${
                    selectedCategory === cat.id
                      ? 'bg-brand-surface border border-brand-border text-white shadow-md'
                      : 'text-muted hover:text-white'
                  }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative w-full md:max-w-xs">
        <MultiSelect
          value={selectedTags}
          onChange={onUpdateTags}
          placeholder={t('searchPlaceholder')}
        >
          <SelectSearch value={searchQuery} onChange={onUpdateSearch} />
          {[...filteredTagsList].map((tag) => (
            <SelectOption key={tag} value={tag}>
              {tag}
            </SelectOption>
          ))}
        </MultiSelect>
      </div>
    </div>
  )
}

export default ProjectsSearch
