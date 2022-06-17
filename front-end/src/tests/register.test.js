jest.mock('../utils/api/service');

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Register from '../pages/Register';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';

const USER_NAME = 'valid_user_name';
const USER_EMAIL = 'user@user.com';
const USER_PASSWORD = 'user_password';

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

  it('should enable the register button with valid inputs', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, USER_NAME);
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);

    expect(registerButton).not.toBeDisabled();
  });

  it('Should not enable the register button with short name', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, 'tooshort');
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);

    expect(registerButton).toBeDisabled();
  });

  it('Should not enable the register button with invalid email format', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, USER_NAME);
    userEvent.type(emailInput, 'invalid_format.com');
    userEvent.type(passwordInput, USER_PASSWORD);

    expect(registerButton).toBeDisabled();
  });

  it('Should not enable the register button with short password', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, USER_NAME);
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, 'short');

    expect(registerButton).toBeDisabled();
  });
});

describe('Test Register page with navigation', () => {
  describe('as customer', () => {
    let history;
  
    beforeEach(() => {
      service.register.mockImplementation(() => Promise.resolve(userMock.customer));
  
      history = renderWithRouter(<Register />).history;
      history.push = jest.fn();

      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/senha/i);
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
  
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD);
      userEvent.type(nameInput, USER_NAME); 
      userEvent.click(registerButton);
    });
  
    afterEach(() => { localStorage.removeItem('user') })
  
    it('should call service.register', () => {
      expect(service.register).toHaveBeenCalledTimes(1);
    });
  
    it('should call service.register with user name, email and password', () => {
      expect(service.register)
      .toHaveBeenCalledWith(USER_NAME, USER_EMAIL, USER_PASSWORD);
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
});
