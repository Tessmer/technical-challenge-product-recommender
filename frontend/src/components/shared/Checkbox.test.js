import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('Renderiza o label com o texto correto', () => {
    render(<Checkbox>Opção de Teste</Checkbox>);

    expect(screen.getByText('Opção de Teste')).toBeInTheDocument();
  });

  test('Permite marcar e desmarcar via onChange', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange}>Clique Aqui</Checkbox>);

    const input = screen.getByRole('checkbox');
    expect(input.checked).toBe(false);

    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('Recebe a prop checked corretamente', () => {
    render(<Checkbox checked>Marcado</Checkbox>);

    const input = screen.getByRole('checkbox');
    expect(input.checked).toBe(true);
  });

  test('Recebe a prop disabled corretamente', () => {
    render(<Checkbox disabled>Desabilitado</Checkbox>);

    const input = screen.getByRole('checkbox');
    expect(input).toBeDisabled();
  });
});
