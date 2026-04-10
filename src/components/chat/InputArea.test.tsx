import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import InputArea from './InputArea'

describe('InputArea', () => {
  it('вызывает onSend с текстом при клике на кнопку', async () => {
    const onSend = vi.fn()
    render(<InputArea onSend={onSend} />)

    const input = screen.getByPlaceholderText(/введите сообщение/i)
    const button = screen.getByRole('button', { name: /отправить/i })

    await userEvent.type(input, 'Привет')
    await userEvent.click(button)

    expect(onSend).toHaveBeenCalledWith('Привет')
  })

  it('вызывает onSend при нажатии Enter', async () => {
    const onSend = vi.fn()
    render(<InputArea onSend={onSend} />)

    const input = screen.getByPlaceholderText(/введите сообщение/i)
    await userEvent.type(input, 'Привет{Enter}')

    expect(onSend).toHaveBeenCalledWith('Привет')
  })

  it('кнопка заблокирована при пустом вводе', () => {
    render(<InputArea onSend={vi.fn()} />)

    const button = screen.getByRole('button', { name: /отправить/i })
    expect(button).toBeDisabled()
  })
})