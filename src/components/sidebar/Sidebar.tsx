import React, { useState } from 'react'
import './Sidebar.css'

interface ChatItem {
  id: string
  name: string
}

interface SidebarProps {
  chats: ChatItem[]
  activeChatId?: string | null
  onSelectChat?: (id: string) => void
  onDeleteChat?: (id: string) => void
  onRenameChat?: (id: string, newName: string) => void
  onCreateChat?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  onCreateChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (chatId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот чат?')) {
      onDeleteChat?.(chatId)
    }
  }

  const handleStartEdit = (chat: ChatItem) => {
    setEditingChatId(chat.id)
    setEditName(chat.name)
  }

  const handleSaveEdit = (chatId: string) => {
    const trimmedName = editName.trim()
    if (trimmedName && trimmedName !== chats.find((c) => c.id === chatId)?.name) {
      onRenameChat?.(chatId, trimmedName)
    }
    setEditingChatId(null)
    setEditName('')
  }

  const handleKeyDown = (e: React.KeyboardEvent, chatId: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(chatId)
    } else if (e.key === 'Escape') {
      setEditingChatId(null)
      setEditName('')
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <input
          type="text"
          className="sidebar__search"
          placeholder="Поиск чатов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Поиск"
        />
        <button
          className="sidebar__create-button"
          onClick={onCreateChat}
          aria-label="Создать чат"
        >
          + Новый чат
        </button>
      </div>

      <div className="sidebar__list">
        {filteredChats.length === 0 ? (
          <div className="sidebar__empty">
            {searchQuery ? 'Чаты не найдены' : 'Нет чатов'}
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`sidebar__item ${
                activeChatId === chat.id ? 'sidebar__item--active' : ''
              }`}
              onClick={() => onSelectChat?.(chat.id)}
            >
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  className="sidebar__edit-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleSaveEdit(chat.id)}
                  onKeyDown={(e) => handleKeyDown(e, chat.id)}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="sidebar__item-name">{chat.name}</span>
                  <div className="sidebar__item-actions">
                    <button
                      className="sidebar__action-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStartEdit(chat)
                      }}
                      aria-label="Редактировать"
                    >
                      ✏️
                    </button>
                    <button
                      className="sidebar__action-button sidebar__action-button--danger"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(chat.id)
                      }}
                      aria-label="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Sidebar