import React, { useEffect, useRef, type ReactNode, type FC } from 'react'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md'
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const sizeClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
      dialog.close()
    }
  }, [isOpen])

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleCancel}
      className={clsx(
        sizeClasses[size],
        'fixed inset-0 m-auto bg-brand-surface border border-brand-border text-white p-6 rounded-brand shadow-2xl w-full backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-200'
      )}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          {title && <h3 className="text-xl font-bold font-sans">{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            className="outline-none text-muted hover:text-white cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-brand-sm hover:bg-brand-border"
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
