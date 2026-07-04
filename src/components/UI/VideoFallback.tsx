import { type FC, useEffect, useRef, useState } from 'react'

interface VideoFallbackProps {
  youtube: string
  vk: string
  timeoutMs?: number
}

type Player = 'loading' | 'youtube' | 'vk'

const VideoFallback: FC<VideoFallbackProps> = ({ youtube, vk, timeoutMs = 8000 }) => {
  const [player, setPlayer] = useState<Player>('loading')
  const [youtubeReady, setYoutubeReady] = useState(false)

  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayer('loading')
    setYoutubeReady(false)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      if (!youtubeReady) {
        setPlayer('vk')
      }
    }, timeoutMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [youtube, vk])

  useEffect(() => {
    if (youtubeReady) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlayer('youtube')

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [youtubeReady])

  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden">
      {player === 'loading' && <div className="absolute inset-0 animate-pulse bg-gray-800" />}

      <iframe
        key={youtube}
        src={youtube}
        onLoad={() => setYoutubeReady(true)}
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
          player === 'youtube' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      <iframe
        key={vk}
        src={vk}
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
          player === 'vk' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
        allowFullScreen
      />
    </div>
  )
}

export default VideoFallback
