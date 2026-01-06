import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Features from './Features';

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

describe('Features', () => {
  const features = [
    'Chat ao vivo e mensagens automatizadas',
    'Automação de fluxos de trabalho de vendas',
    'Integração de funcionalidades preditivas nos produtos RD Station',
  ];

  const onFeatureChange = jest.fn();

  const RenderFeatures = (props) => render(<Features {...props} />);

  test('Renderiza o título e a lista de funcionalidades', () => {
    RenderFeatures({
      features,
      selectedFeatures: [],
      onFeatureChange,
    });

    expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('Marca os checkboxes com base em selectedFeatures', () => {
    RenderFeatures({
      features,
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      onFeatureChange,
    });

    expect(
      screen.getByTestId('checkbox-Chat ao vivo e mensagens automatizadas')
    ).toBeChecked();
    expect(
      screen.getByTestId('checkbox-Automação de fluxos de trabalho de vendas')
    ).not.toBeChecked();
  });

  test('Adiciona uma feature ao clicar em um checkbox desmarcado', () => {
    RenderFeatures({
      features,
      selectedFeatures: [],
      onFeatureChange,
    });

    fireEvent.click(
      screen.getByTestId('checkbox-Chat ao vivo e mensagens automatizadas')
    );

    expect(onFeatureChange).toHaveBeenCalledWith([
      'Chat ao vivo e mensagens automatizadas',
    ]);
  });

  test('Remove uma feature ao clicar em um checkbox marcado', () => {
    RenderFeatures({
      features,
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      onFeatureChange,
    });

    fireEvent.click(
      screen.getByTestId('checkbox-Chat ao vivo e mensagens automatizadas')
    );

    expect(onFeatureChange).toHaveBeenCalledWith([]);
  });

  test('Mantém múltiplas features selecionadas corretamente', () => {
    RenderFeatures({
      features,
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      onFeatureChange,
    });

    fireEvent.click(
      screen.getByTestId('checkbox-Automação de fluxos de trabalho de vendas')
    );

    expect(onFeatureChange).toHaveBeenCalledWith([
      'Chat ao vivo e mensagens automatizadas',
      'Automação de fluxos de trabalho de vendas',
    ]);
  });
});
