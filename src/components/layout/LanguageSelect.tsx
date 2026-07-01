import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Select } from '../UI/select/Select.tsx'
import { SelectOption } from '../UI/select/SelectOption.tsx'

const LanguageSelect = () => {
  const { i18n } = useTranslation()
  const languageTitleMap = new Map<string, string>([
    ['en', 'EN'],
    ['ru', 'РУ'],
  ])

  const [lang, setLang] = useState(languageTitleMap.get(i18n.language.includes('ru') ? 'ru' : 'en'))

  const changeLanguage = (l: string) => {
    const langTitle = languageTitleMap.get(l) ?? languageTitleMap.get('en')
    setLang(langTitle)
    i18n.changeLanguage(l)
  }

  return (
    <Select value={lang!} onChange={changeLanguage}>
      <SelectOption value="en">{languageTitleMap.get('en')}</SelectOption>
      <SelectOption value="ru">{languageTitleMap.get('ru')}</SelectOption>
    </Select>
  )
}

export default LanguageSelect
