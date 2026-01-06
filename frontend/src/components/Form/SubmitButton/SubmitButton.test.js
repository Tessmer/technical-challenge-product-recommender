import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  const RenderSubmitButton = (props) => render(<SubmitButton {...props} />);

  test('Renderiza o botão com o texto fornecido', () => {
    RenderSubmitButton({ text: 'Enviar', disabled: false });

    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Enviar');
  });

  test('Aplica classes corretas quando habilitado', () => {
    RenderSubmitButton({ text: 'Enviar', disabled: false });
    const button = screen.getByRole('button', { name: /enviar/i });

    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('hover:bg-blue-700');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('cursor-pointer');
  });

  test('Aplica classes corretas quando desabilitado', () => {
    RenderSubmitButton({ text: 'Enviar', disabled: true });
    const button = screen.getByRole('button', { name: /enviar/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-300');
    expect(button).toHaveClass('text-gray-400');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  test('Não dispara eventos quando desabilitado', async () => {
    const handleClick = jest.fn();
    RenderSubmitButton({
      text: 'Enviar',
      disabled: true,
      onClick: handleClick,
    });

    const button = screen.getByRole('button', { name: /enviar/i });
    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
