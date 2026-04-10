import React, { useState, KeyboardEvent } from 'react'
import './InputArea.css'

interface InputAreaProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

const InputArea: React.FC<InputAreaProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Введите сообщение...',
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !disabled) {
      onSend(trimmedValue)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isSendDisabled = disabled || inputValue.trim() === ''

  return (
    <div className="input-area">
      <textarea
        className="input-area__field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
      />
      <button
        className="input-area__button"
        onClick={handleSend}
        disabled={isSendDisabled}
        aria-label="Отправить"
      >
        Отправить
      </button>
    </div>
  )
}

export default InputArea