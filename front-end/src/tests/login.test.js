jest.mock('../utils/api/service');

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';

const USER_EMAIL = 'user@user.com';
const USER_PASSWORD = 'user_password';

describe('Test Login page without navigation', () => {
  let emailInput;
  let passwordInput;
  let loginButton;

  beforeEach(() => {
    renderWithRouter(<Login />);
  
    emailInput = screen.getByRole('textbox', { name: /login/i });
    passwordInput = screen.getByLabelText(/senha/i);
    loginButton = screen.getByRole('button', { name: /login/i });
  });
  it('Should have the right screen elements', () => {
    const logo = screen.getByRole('img', { name: /logo app delivery/i });
    const title = screen.getByRole('heading', { name: /delivery app/i, level: 1 });
  
    const registerButton = screen.getByRole('button', { name: /não tenho conta/i });

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(registerButton).toBeInTheDocument();
  });

  it('Should enable login button', () => {
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);

    expect(loginButton).not.toBeDisabled();
  });

  it('Should not enable login button', () => {
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'invalid_email');
    userEvent.type(passwordInput, 'invalid_password');

    expect(loginButton).toBeDisabled();
  });
});

describe('Test login page with navigation', () => {
  afterEach(() => jest.resetAllMocks());

  describe('Trying to register', () => {
    it('Should redirect user to /register by clicking in register button', () => {
      const { history } = renderWithRouter(<Login />);
      const registerButton = screen.getByRole('button', { name: /não tenho conta/i });
      userEvent.click(registerButton);
      
      const { pathname } = history.location;
      expect(pathname).toBe('/register');
    });
  });
  
  describe('Trying to log in', () => {
    let history;
    let emailInput;
    let passwordInput;
    let loginButton;
  
    beforeEach(() => {
      service.login.mockImplementation(() => Promise.resolve(userMock.customer));

      history = renderWithRouter(<Login />).history;
      history.push = jest.fn();

      emailInput = screen.getByRole('textbox', { name: /login/i });
      passwordInput = screen.getByLabelText(/senha/i);
      loginButton = screen.getByRole('button', { name: /login/i });
  
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD); 
      userEvent.click(loginButton);
    });
  
    it('should call register.login', async () => {
      expect(service.login).toHaveBeenCalledTimes(1);
      expect(service.login)
      .toHaveBeenCalledWith(USER_EMAIL, USER_PASSWORD);
      
      await waitFor(() => {
        expect(history.push).toBeCalledWith({
          hash: '',
          pathname: '/customer/products',
          search: '',
        }, undefined);
      });
    });

    // it('should call register.login with user email and password', () => {
    //   renderWithRouter(<Login />);
    //   const emailInput = screen.getByRole('textbox', { name: /login/i });
    //   const passwordInput = screen.getByLabelText(/senha/i);
    //   const loginButton = screen.getByRole('button', { name: /login/i });

    //   userEvent.type(emailInput, USER_EMAIL);
    //   userEvent.type(passwordInput, USER_PASSWORD); 
    //   userEvent.click(loginButton);

    // });

    // it('should redirect to /customer/products when logging in as customer', () => {
    //   const { history } = renderWithRouter(<Login />);
    //   const emailInput = screen.getByRole('textbox', { name: /login/i });
    //   const passwordInput = screen.getByLabelText(/senha/i);
    //   const loginButton = screen.getByRole('button', { name: /login/i });

    //   userEvent.type(emailInput, USER_EMAIL);
    //   userEvent.type(passwordInput, USER_PASSWORD); 
    //   userEvent.click(loginButton);

    //   const { pathname } = history.location;
    //   expect(pathname).toBe('/customer/products');
    // });
  });
});
