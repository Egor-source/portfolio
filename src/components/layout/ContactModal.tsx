import { useTranslation } from 'react-i18next'
import Modal from '../UI/Modal.tsx'
import TelegramIcon from '../../assets/icons/telegram.svg?react'
import WhatsappIcon from '../../assets/icons/whatsapp.svg?react'
import EmailIcon from '../../assets/icons/email.svg?react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation()

  const contactLinks = [
    {
      id: 'telegram',
      name: 'Telegram',
      icon: TelegramIcon,
      value: '@KrotovEgo',
      href: 'https://t.me/KrotovEgo',
    },
    {
      id: 'email',
      name: 'Email',
      icon: EmailIcon,
      value: 'egorkk1211@gmail.com',
      href: 'mailto:egorkk1211@gmail.com',
    },
    {
      id: 'wahatsapp',
      name: 'WhatsApp',
      icon: WhatsappIcon,
      value: '+995 551 11 83 47',
      href: 'https://wa.me/995551118347',
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('contactMe')}>
      <p className="text-muted mb-5 leading-relaxed">{t('contactGreetings')}</p>

      <div className="space-y-3">
        {contactLinks.map((contact) => (
          <a
            key={contact.id}
            href={contact.href}
            target={contact.id !== 'email' ? '_blank' : undefined}
            rel={contact.id !== 'email' ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-between p-3.5 rounded-brand-sm bg-brand-bg border border-brand-border hover:border-accent-purple/60 transition-all duration-200 group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <contact.icon className="w-5 h-5" />
              <span className="text-white font-medium text-sm">{contact.name}</span>
            </div>
            <span className="text-xs font-mono text-accent-purple group-hover:text-accent-purple-light transition-colors">
              {contact.value} →
            </span>
          </a>
        ))}
      </div>
    </Modal>
  )
}
