import React, { useState } from 'react'
import './Message.css'

interface MessageProps {
  variant: 'user' | 'assistant'
  content: string
  timestamp?: number
  onCopy?: () => void
}

const Message: React.FC<MessageProps> = ({
  variant,
  content,
  timestamp,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatTime = (ts: number): string => {
    return new Date(ts).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`message message--${variant}`}>
      <div className="message__content">
        <p className="message__text">{content}</p>
        {timestamp && (
          <span className="message__time">{formatTime(timestamp)}</span>
        )}
      </div>
      {variant === 'assistant' && (
        <div className="message__actions">
          <button
            className="message__copy-button"
            onClick={handleCopy}
            aria-label="Копировать"
          >
            {copied ? 'Скопировано!' : 'Копировать'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Message