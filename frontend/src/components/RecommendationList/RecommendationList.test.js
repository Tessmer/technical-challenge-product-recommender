import React from 'react';
import { render, screen } from '@testing-library/react';

import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  const RenderRecommendationList = (props) =>
    render(<RecommendationList {...props} />);

  test('Exibe mensagem quando não há recomendações', () => {
    RenderRecommendationList({ recommendations: [] });

    expect(
      screen.getByText('Nenhuma recomendação encontrada.')
    ).toBeInTheDocument();
  });

  test('Renderiza a lista de recomendações quando houver itens', () => {
    const recommendations = [{ name: 'RD Station' }, { name: 'RD Conversas' }];

    RenderRecommendationList({ recommendations });

    expect(screen.getByText('RD Station')).toBeInTheDocument();
    expect(screen.getByText('RD Conversas')).toBeInTheDocument();
  });

  test('Renderiza o título da lista', () => {
    RenderRecommendationList({ recommendations: [] });

    expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
  });

  test('Quantidade de itens renderizados corresponde às recomendações', () => {
    const recommendations = [
      { name: 'Produto A' },
      { name: 'Produto B' },
      { name: 'Produto C' },
    ];

    RenderRecommendationList({ recommendations });

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(recommendations.length);
  });
});
