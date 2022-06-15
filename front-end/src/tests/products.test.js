import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Products from '../pages/Products';
import renderWithRouter from './renderWithRouter';

describe('Test Products page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({
          'user': {
            'name': 'Cliente Zé Birita',
            },
          'carrinho': '',
          }),
        ),
      },
      writable: true,
    });
    renderWithRouter(<Products />);
  });
  it('Should have the right screen elements', () => {
    const link = screen.getByRole('link', { name: /produtos/i });
    // const link2 = screen.getByRole('link', { name: /pedidos/i });
  
    expect(link).toBeInTheDocument();
    // expect(link2).toBeInTheDocument();
  });
});
