import { useEffect } from 'react'
import { useMatches } from 'react-router'
import type { RouterMeta } from '../types/RouterMeta.ts'
import { useTranslation } from 'react-i18next'

export const useSetTitle = () => {
  const matches = useMatches()
  const { t } = useTranslation()
  const currentRoute = matches[matches.length - 1]
  const handle = currentRoute?.handle as RouterMeta | undefined
  const title = handle?.title

  useEffect(() => {
    if (title) {
      document.title = t(`pageTitle.${title}`)
    }
  }, [title, t])
}
