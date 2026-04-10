import { describe, it, expect } from 'vitest'
import { chatReducer, initialState, ChatState, Message } from './chatReducer'

describe('chatReducer', () => {
  it('ADD_MESSAGE — добавляет сообщение в конец массива', () => {
    const state: ChatState = {
      ...initialState,
      chats: [{ id: '1', name: 'Test', messages: [] }],
      activeChatId: '1',
    }

    const message: Message = {
      id: 'm1',
      role: 'user',
      content: 'Hello',
      timestamp: Date.now(),
    }

    const newState = chatReducer(state, {
      type: 'ADD_MESSAGE',
      payload: { chatId: '1', message },
    })

    const messages = newState.chats[0].messages
    expect(messages).toHaveLength(1)
    expect(messages[0]).toEqual(message)
  })

  it('CREATE_CHAT — создаёт новый чат с уникальным id', () => {
    const state = initialState
    const newState = chatReducer(state, { type: 'CREATE_CHAT' })

    expect(newState.chats).toHaveLength(1)
    expect(newState.chats[0].id).toBeDefined()
    expect(newState.chats[0].name).toMatch(/Новый чат/)
    expect(newState.activeChatId).toBe(newState.chats[0].id)
  })

  it('DELETE_CHAT — удаляет чат и сбрасывает activeChatId при необходимости', () => {
    const state: ChatState = {
      chats: [
        { id: '1', name: 'A', messages: [] },
        { id: '2', name: 'B', messages: [] },
      ],
      activeChatId: '1',
    }

    const newState = chatReducer(state, { type: 'DELETE_CHAT', payload: '1' })

    expect(newState.chats).toHaveLength(1)
    expect(newState.chats[0].id).toBe('2')
    expect(newState.activeChatId).toBeNull()
  })

  it('RENAME_CHAT — обновляет имя чата по id', () => {
    const state: ChatState = {
      chats: [
        { id: '1', name: 'Old', messages: [] },
        { id: '2', name: 'Other', messages: [] },
      ],
      activeChatId: '1',
    }

    const newState = chatReducer(state, {
      type: 'RENAME_CHAT',
      payload: { id: '1', name: 'New' },
    })

    expect(newState.chats[0].name).toBe('New')
    expect(newState.chats[1].name).toBe('Other')
  })
})