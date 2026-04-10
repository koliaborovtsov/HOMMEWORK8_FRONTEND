import { ChatState } from '../store/chatReducer'

const STORAGE_KEY = 'chat_state'

export const saveState = (state: ChatState): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (error) {
    console.error('Failed to save state to localStorage:', error)
  }
}

export const loadState = (): ChatState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState) as ChatState
  } catch (error) {
    console.error('Failed to load state from localStorage:', error)
    return undefined
  }
}

export const clearState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear state from localStorage:', error)
  }
}