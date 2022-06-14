import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Register from '../pages/Register';
import renderWithRouter from './renderWithRouter';

describe('Test Register page without navigation', () => {
  beforeEach(() => renderWithRouter(<Register />));
  it('Should have the right screen elements', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  it('should active the register button', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, 'João dos testes');
    userEvent.type(emailInput, 'joao.teste@teste.com');
    userEvent.type(passwordInput, 'senha*forte*demais');

    expect(registerButton).not.toBeDisabled();
  });

  it('Should not active the register button', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, 'João dos testes');
    userEvent.type(emailInput, 'joao.testeteste.com');
    userEvent.type(passwordInput, 'senha*forte*demais');

    expect(registerButton).toBeDisabled();
  });
});
