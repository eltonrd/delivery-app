jest.mock('../utils/api/service');

import React from 'react';
import { findByRole, screen, waitFor } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App route /', () => {
  it('should auto redirect to /login', async () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/login');
  });
});
