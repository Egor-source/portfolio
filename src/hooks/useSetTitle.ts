import { useEffect } from 'react'
import { useMatches, useParams } from 'react-router'
import type { RouterMeta } from '../types/RouterMeta.ts'
import { useTranslation } from 'react-i18next'

export const useSetTitle = () => {
  const matches = useMatches()
  const params = useParams()
  const { t } = useTranslation()
  const currentRoute = matches[matches.length - 1]
  const handle = currentRoute?.handle as RouterMeta | undefined
  const title = handle?.useParam ? params[handle?.useParam] : handle?.title

  useEffect(() => {
    if (handle?.useParam) {
      document.title = title!
      return
    }

    if (title) {
      document.title = t(`pageTitle.${title}`)
    }
  }, [title, t])
}
