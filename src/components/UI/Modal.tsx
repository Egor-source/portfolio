import React, { useEffect, useRef, type ReactNode, type FC } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleCancel}
      className="fixed inset-0 m-auto bg-brand-surface border border-brand-border text-white p-6 rounded-brand shadow-2xl max-w-md w-full backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-200"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          {title && <h3 className="text-xl font-bold font-sans">{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-white cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-brand-sm hover:bg-brand-border"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="text-muted text-sm space-y-4">{children}</div>
      </div>
    </dialog>
  )
}

export default Modal
