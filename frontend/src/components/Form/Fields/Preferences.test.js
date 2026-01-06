import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Preferences from './Preferences';

jest.mock('../../shared/Checkbox', () => {
  return ({ children, checked, onChange, value }) => (
    <label>
      <input
        type="checkbox"
        data-testid={`checkbox-${value}`}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
});

describe('Preferences', () => {
  const preferences = [
    'Integração fácil com ferramentas de e-mail',
    'Relatórios avançados de desempenho de vendas',
    'Segmentação avançada de leads',
  ];

  const onPreferenceChange = jest.fn();

  const RenderPreferences = (props) => render(<Preferences {...props} />);

  test('Renderiza o título e a lista de preferências', () => {
    RenderPreferences({
      preferences,
      selectedPreferences: [],
      onPreferenceChange,
    });

    expect(screen.getByText('Preferências:')).toBeInTheDocument();

    preferences.forEach((preference) => {
      expect(screen.getByText(preference)).toBeInTheDocument();
    });
  });

  test('Marca os checkboxes com base em selectedPreferences', () => {
    RenderPreferences({
      preferences,
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      onPreferenceChange,
    });

    expect(
      screen.getByTestId('checkbox-Integração fácil com ferramentas de e-mail')
    ).toBeChecked();
  });

  test('Adiciona uma preferência ao clicar em um checkbox desmarcado', () => {
    RenderPreferences({
      preferences,
      selectedPreferences: [],
      onPreferenceChange,
    });

    fireEvent.click(
      screen.getByTestId('checkbox-Integração fácil com ferramentas de e-mail')
    );

    expect(onPreferenceChange).toHaveBeenCalledWith([
      'Integração fácil com ferramentas de e-mail',
    ]);
  });

  test('Remove uma preferência ao clicar em um checkbox marcado', () => {
    RenderPreferences({
      preferences,
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      onPreferenceChange,
    });

    fireEvent.click(
      screen.getByTestId('checkbox-Integração fácil com ferramentas de e-mail')
    );

    expect(onPreferenceChange).toHaveBeenCalledWith([]);
  });

  test('Mantém múltiplas preferências selecionadas corretamente', () => {
    RenderPreferences({
      preferences,
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      onPreferenceChange,
    });

    expect(
      screen.getByTestId('checkbox-Integração fácil com ferramentas de e-mail')
    ).toBeChecked();

    fireEvent.click(
      screen.getByTestId(
        'checkbox-Relatórios avançados de desempenho de vendas'
      )
    );

    expect(onPreferenceChange).toHaveBeenCalledTimes(1);
    expect(onPreferenceChange).toHaveBeenCalledWith([
      'Integração fácil com ferramentas de e-mail',
      'Relatórios avançados de desempenho de vendas',
    ]);
  });
});
