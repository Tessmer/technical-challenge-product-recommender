import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import RecommendationType from './RecommendationType';

jest.mock('../../shared/Checkbox', () => {
  return ({ onChange, value, type = 'radio', name }) => (
    <input
      type={type}
      name={name}
      value={value}
      data-testid={`radio-${value}`}
      onChange={onChange}
    />
  );
});

describe('RecommendationType', () => {
  const onRecommendationTypeChange = jest.fn();

  const RenderRecommendationType = (props) =>
    render(
      <RecommendationType
        onRecommendationTypeChange={onRecommendationTypeChange}
        {...props}
      />
    );

  test('Renderiza o título do componente', () => {
    RenderRecommendationType();

    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
  });

  test('Renderiza as duas opções de tipo de recomendação', () => {
    RenderRecommendationType();

    expect(screen.getByText('Produto Único')).toBeInTheDocument();

    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
  });

  test("Chama onRecommendationTypeChange com 'SingleProduct' ao selecionar Produto Único", () => {
    RenderRecommendationType();

    fireEvent.click(screen.getByTestId('radio-SingleProduct'));

    expect(onRecommendationTypeChange).toHaveBeenCalledTimes(1);
    expect(onRecommendationTypeChange).toHaveBeenCalledWith('SingleProduct');
  });

  test("Chama onRecommendationTypeChange com 'MultipleProducts' ao selecionar Múltiplos Produtos", () => {
    RenderRecommendationType();

    fireEvent.click(screen.getByTestId('radio-MultipleProducts'));

    expect(onRecommendationTypeChange).toHaveBeenCalledTimes(1);
    expect(onRecommendationTypeChange).toHaveBeenCalledWith('MultipleProducts');
  });
});
