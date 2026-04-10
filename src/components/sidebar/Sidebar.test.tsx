import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from './Sidebar'
import { vi } from 'vitest'

const chats = [
  { id: '1', name: 'Чат с поддержкой' },
  { id: '2', name: 'Личный чат' },
]

describe('Sidebar', () => {
  it('фильтрует чаты по поиску', async () => {
    render(<Sidebar chats={chats} />)

    const search = screen.getByPlaceholderText(/поиск/i)
    await userEvent.type(search, 'личный')

    expect(screen.getByText('Личный чат')).toBeInTheDocument()
    expect(screen.queryByText('Чат с поддержкой')).not.toBeInTheDocument()
  })

  it('показывает все чаты при пустом поиске', async () => {
    render(<Sidebar chats={chats} />)

    const search = screen.getByPlaceholderText(/поиск/i)
    await userEvent.type(search, 'личный')
    await userEvent.clear(search)

    expect(screen.getByText('Личный чат')).toBeInTheDocument()
    expect(screen.getByText('Чат с поддержкой')).toBeInTheDocument()
  })

  it('показывает подтверждение при удалении', async () => {
    window.confirm = vi.fn(() => true)
    render(<Sidebar chats={chats} />)

    const deleteButton = screen.getAllByRole('button', { name: /удалить/i })[0]
    await userEvent.click(deleteButton)

    expect(window.confirm).toHaveBeenCalled()
  })
})