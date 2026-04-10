import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', () => {
  it('user variant — содержит класс user', () => {
    render(<Message variant="user" content="Привет" />)
    const message = screen.getByText('Привет')
    expect(message).toHaveClass('user')
  })

  it('assistant variant — содержит класс assistant', () => {
    render(<Message variant="assistant" content="Здравствуйте" />)
    const message = screen.getByText('Здравствуйте')
    expect(message).toHaveClass('assistant')
  })

  it('кнопка копирования есть только у ассистента', () => {
    const { rerender } = render(<Message variant="user" content="user" />)
    expect(screen.queryByRole('button', { name: /копировать/i })).not.toBeInTheDocument()

    rerender(<Message variant="assistant" content="assistant" />)
    expect(screen.getByRole('button', { name: /копировать/i })).toBeInTheDocument()
  })
})