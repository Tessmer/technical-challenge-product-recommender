import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

jest.mock('../../hooks/useProducts', () => () => ({
  preferences: ['Pref1', 'Pref2'],
  features: ['Feat1', 'Feat2'],
  products: [{ name: 'Produto 1' }],
}));

jest.mock('../../hooks/useForm', () => {
  const React = require('react');
  return () => {
    const [formData, setFormData] = React.useState({
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    });
    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    return { formData, handleChange };
  };
});

jest.mock('../../hooks/useRecommendations', () => {
  return () => ({
    getRecommendations: jest.fn(() => [{ name: 'Produto 1' }]),
  });
});

describe('Form', () => {
  const setRecommendations = jest.fn();

  const RenderForm = () =>
    render(<Form setRecommendations={setRecommendations} />);

  test('Botão inicia desabilitado e habilita após selecionar todos os campos', () => {
    RenderForm();

    const submitButton = screen.getByRole('button', {
      name: /obter recomendação/i,
    });

    expect(submitButton.disabled).toBe(true);

    fireEvent.click(screen.getByTestId('checkbox-Pref1'));
    fireEvent.click(screen.getByTestId('checkbox-Feat1'));
    fireEvent.click(screen.getByTestId('radio-SingleProduct'));

    expect(submitButton.disabled).toBe(false);
  });

  test('Submit chama setRecommendations com o resultado do getRecommendations', () => {
    RenderForm();

    fireEvent.click(screen.getByTestId('checkbox-Pref1'));
    fireEvent.click(screen.getByTestId('checkbox-Feat1'));
    fireEvent.click(screen.getByTestId('radio-MultipleProducts'));

    fireEvent.click(
      screen.getByRole('button', { name: /obter recomendação/i })
    );

    expect(setRecommendations).toHaveBeenCalledWith([{ name: 'Produto 1' }]);
  });
});
