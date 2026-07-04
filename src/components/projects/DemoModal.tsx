import { type FC, useEffect, useState } from 'react'
import Modal from '../UI/modal/Modal.tsx'
import type { ModalProps } from '../UI/modal/types.ts'
import { useTranslation } from 'react-i18next'
import VideoFallback from '../UI/VideoFallback.tsx'

interface DemoModalProps extends ModalProps {
  title: string
  youtube: string
  vk: string
}

const DemoModal: FC<DemoModalProps> = ({ isOpen, onClose, title, youtube, vk }) => {
  const { t } = useTranslation('projects')
  const [firstOpen, setFirstOpen] = useState(false)

  useEffect(() => {
    if (isOpen && !firstOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFirstOpen(true)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('demoTitle', { projectTitle: title })}
      size="7xl"
    >
      {firstOpen && <VideoFallback youtube={youtube} vk={vk} />}
    </Modal>
  )
}

export default DemoModal
