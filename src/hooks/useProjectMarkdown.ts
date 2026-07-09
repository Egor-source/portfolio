import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const markdownFiles = import.meta.glob('@/locales/*/projectsDescriptions/*.md', {
  query: '?raw',
  import: 'default',
})

const cache = new Map<string, string>()

interface UseProjectMarkdownResult {
  content: string | null
  loading: boolean
  error: Error | null
}

export function useProjectMarkdown(slug: string): UseProjectMarkdownResult {
  const { i18n } = useTranslation()

  const [content, setContent] = useState<string | null>(
    () => cache.get(`${i18n.language}/${slug}`) ?? null
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const [lang] = i18n.language.split('-')
    const cacheKey = `${lang}/${slug}`

    if (cache.has(cacheKey)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(cache.get(cacheKey)!)
      return
    }

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const path = `/src/locales/${lang}/projectsDescriptions/${slug}.md`
        console.log(markdownFiles)

        const loader = markdownFiles[path]

        if (!loader) {
          throw new Error(`Markdown file not found: ${path}`)
        }

        const markdown = await loader()

        cache.set(cacheKey, markdown)

        setContent(markdown)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug, i18n.language])

  return {
    content,
    loading,
    error,
  }
}
