jest.mock('../utils/api/service');

import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';

const USER_EMAIL = 'user@user.com';
const USER_PASSWORD = 'user_password';

describe('Test Login page without navigation', () => {
  it('Should have the right screen elements', () => {
    renderWithRouter(<Login />);
  
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

  it('Should enable login button', () => {
    renderWithRouter(<Login />);
  
    const emailInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);

    expect(loginButton).not.toBeDisabled();
  });

  it('Should not enable login button with invalid email format', () => {
    renderWithRouter(<Login />);
  
    const emailInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'invalid_email');
    userEvent.type(passwordInput, USER_PASSWORD);

    expect(loginButton).toBeDisabled();
  });

  it('Should not enable login button with short password', () => {
    renderWithRouter(<Login />);
  
    const emailInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, 'short');

    expect(loginButton).toBeDisabled();
  });

  describe('should auto redirect', () => {
    afterEach(() => localStorage.removeItem('user'));

    it('to /customer/products if localStorage has customer info', () => {
      localStorage.setItem('user', JSON.stringify({ role: userMock.customer.user.role }));
      const { history } = renderWithRouter(<Login />);
    
      const { pathname } = history.location;
      expect(pathname).toBe('/customer/products');
    });
  
    it('to /admin/manage if localStorage has administrator info', () => {
      localStorage.setItem('user', JSON.stringify({ role: userMock.administrator.user.role }));
      const { history } = renderWithRouter(<Login />);
    
      const { pathname } = history.location;
      expect(pathname).toBe('/admin/manage');
    });
  
    it('to /seller/orders if localStorage has seller info', () => {
      localStorage.setItem('user', JSON.stringify({ role: userMock.seller.user.role }));
      const { history } = renderWithRouter(<Login />);
    
      const { pathname } = history.location;
      expect(pathname).toBe('/seller/orders');
    });
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
    describe('as customer', () => {
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
  
      afterEach(() => { localStorage.removeItem('user') })
    
      it('should call service.login', () => {
        expect(service.login).toHaveBeenCalledTimes(1);
      });
  
      it('should call service.login with user email and password', () => {
        expect(service.login)
        .toHaveBeenCalledWith(USER_EMAIL, USER_PASSWORD);
  
      });
  
      it('should redirect to /customer/products', async () => {
        await waitFor(() => {
          expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/customer/products',
            search: '',
          }, undefined);
        });
      });
    });

    describe('as administrator', () => {
      afterEach(() => { localStorage.removeItem('user') });

      it('should redirect to /admin/manage', async () => {
        service.login.mockImplementation(() => Promise.resolve(userMock.administrator));
  
        const { history } = renderWithRouter(<Login />);
        history.push = jest.fn();
  
        const emailInput = screen.getByRole('textbox', { name: /login/i });
        const passwordInput = screen.getByLabelText(/senha/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
    
        userEvent.type(emailInput, USER_EMAIL);
        userEvent.type(passwordInput, USER_PASSWORD); 
        userEvent.click(loginButton);

        await waitFor(() => {
          expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/admin/manage',
            search: '',
          }, undefined);
        });
      });
    });

    describe('as seller', () => {
      afterEach(() => { localStorage.removeItem('user') });

      it('should redirect to /seller/orders', async () => {
        service.login.mockImplementation(() => Promise.resolve(userMock.seller));
  
        const { history } = renderWithRouter(<Login />);
        history.push = jest.fn();
  
        const emailInput = screen.getByRole('textbox', { name: /login/i });
        const passwordInput = screen.getByLabelText(/senha/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
    
        userEvent.type(emailInput, USER_EMAIL);
        userEvent.type(passwordInput, USER_PASSWORD); 
        userEvent.click(loginButton);

        await waitFor(() => {
          expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/seller/orders',
            search: '',
          }, undefined);
        });
      });
    });

    describe('with invalid user email or password', () => {
      it('should show error message', async () => {
        service.login.mockImplementation(() => Promise.resolve(undefined));
        renderWithRouter(<Login />);
      
        const emailInput = screen.getByRole('textbox', { name: /login/i });
        const passwordInput = screen.getByLabelText(/senha/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        let errorElement = screen.queryByText(/email ou senha invalidos!/i);
    
        userEvent.type(emailInput, 'wrong@email.com');
        userEvent.type(passwordInput, 'wrong_password');
    
        expect(errorElement).not.toBeInTheDocument();
    
        await act(async () => {
          userEvent.click(loginButton);
        });
    
        errorElement = screen.queryByText(/email ou senha invalidos!/i);
    
        expect(errorElement).toBeInTheDocument();
      });
    });
  });
});
