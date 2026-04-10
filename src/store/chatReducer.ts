// types
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface Chat {
  id: string
  name: string
  messages: Message[]
}

export interface ChatState {
  chats: Chat[]
  activeChatId: string | null
}

// initial state
export const initialState: ChatState = {
  chats: [],
  activeChatId: null,
}

// action types
export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'CREATE_CHAT' }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'RENAME_CHAT'; payload: { id: string; name: string } }
  | { type: 'SET_ACTIVE_CHAT'; payload: string }
  | { type: 'LOAD_STATE'; payload: ChatState }

// helpers
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const generateChatName = (): string => {
  return `Новый чат ${new Date().toLocaleDateString('ru-RU')}`
}

// reducer
export const chatReducer = (
  state: ChatState = initialState,
  action: ChatAction
): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { chatId, message } = action.payload
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        ),
      }
    }

    case 'CREATE_CHAT': {
      const newChat: Chat = {
        id: generateId(),
        name: generateChatName(),
        messages: [],
      }
      return {
        chats: [...state.chats, newChat],
        activeChatId: newChat.id,
      }
    }

    case 'DELETE_CHAT': {
      const chatId = action.payload
      const newChats = state.chats.filter((chat) => chat.id !== chatId)
      return {
        chats: newChats,
        activeChatId:
          state.activeChatId === chatId
            ? newChats.length > 0
              ? newChats[0].id
              : null
            : state.activeChatId,
      }
    }

    case 'RENAME_CHAT': {
      const { id, name } = action.payload
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === id ? { ...chat, name } : chat
        ),
      }
    }

    case 'SET_ACTIVE_CHAT': {
      return {
        ...state,
        activeChatId: action.payload,
      }
    }

    case 'LOAD_STATE': {
      return action.payload
    }

    default:
      return state
  }
}