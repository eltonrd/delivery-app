import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

describe('Test Login page without navigation', () => {
  beforeEach(() => renderWithRouter(<Login />));
  it('Should have the right screen elements', () => {
    const logo = screen.getByRole('img', { name: /logo app delivery/i });
    const title = screen.getByRole('heading', { name: /delivery app/i, level: 1 });
    const emailInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /não tenho conta/i });

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(registerButton).toBeInTheDocument();
  });

  it('Should active login button', () => {
    const emailInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'senha*forte*demais');

    expect(loginButton).not.toBeDisabled();
  });

  it('Should not active login button', () => {
    const emailInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'test.test.com');
    userEvent.type(passwordInput, 'senha*forte*demais');

    expect(loginButton).toBeDisabled();
  });
});

describe('Test login page with navigation', () => {
  it('Should redirect user from /login to /register page', () => {
    const { history } = renderWithRouter(<Login />);
    history.push = jest.fn();

    const registerButton = screen.getByRole('button', { name: /não tenho conta/i });
    userEvent.click(registerButton);
    expect(history.push).toBeCalledWith({
      hash: '',
      pathname: '/register',
      search: '',
    }, undefined);
  });
});
