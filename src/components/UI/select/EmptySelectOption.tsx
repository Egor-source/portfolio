import { useTranslation } from 'react-i18next'

const EmptySelectOption = () => {
  const { t } = useTranslation()

  return (
    <li className="w-full text-left px-4 py-2 text-sm text-muted ">{t('emptySelectOptions')}</li>
  )
}

export default EmptySelectOption
