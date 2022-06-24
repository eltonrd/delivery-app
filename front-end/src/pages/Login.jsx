import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login } from '../utils/api/service';
import RockGlass from '../images/rockGlass.svg';
import {
  setLocalStorageUser,
  localStorageUser,
} from '../utils/localStorage/localStorage';

import '../styles/login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [reveal, setReveal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?[a-z]+$/;
      const minPasswordLength = 8;

      setIsDisabled(password.length < minPasswordLength || !regex.test(email));
    };

    validateInputs();
  }, [password, email]);

  const handleRole = (role) => {
    switch (role) {
    case 'administrator':
      return navigate('/admin/manage');
    case 'customer':
      return navigate('/customer/products');
    default:
      return navigate('/seller/orders');
    }
  };

  const sendLoginInfo = async () => {
    const userInfo = await login(email, password);

    if (!userInfo) {
      return toast.error('Email ou senha inválidos!');
    }

    const { user, token } = userInfo;
    setLocalStorageUser({ ...user, token });
    handleRole(user.role);
  };

  if (!localStorageUser()) {
    return (
      <div className="login-container">
        <img alt="logo app delivery" src={ RockGlass } width="100px" id="logo" />
        <h1>Delivery App</h1>
        <form className="form-container">
          <label htmlFor="login-input" className="login-label">
            Login
            <input
              data-testid="common_login__input-email"
              id="login-input"
              name="login"
              onChange={ ({ target }) => setEmail(target.value) }
              type="text"
              placeholder="customer@deliveryapp.com"
            />
          </label>
          <label htmlFor="password-input" className="password-label">
            Senha
            <input
              data-testid="common_login__input-password"
              id="password-input"
              name="password"
              onChange={ ({ target }) => setPassword(target.value) }
              type={ reveal ? 'text' : 'password' }
              placeholder="********"
            />
            <button
              type="button"
              className="password-handler"
              onClick={ () => setReveal(!reveal) }
            >
              {
                reveal ? <img src="https://img.icons8.com/ios/50/000000/visible--v1.png" alt="revelar senha" />
                  : <img src="https://img.icons8.com/ios/50/000000/hide.png" alt="ocultar senha" />
              }
            </button>
          </label>
          <button
            className={ isDisabled ? 'login-button-disabled' : 'login-button' }
            type="button"
            data-testid="common_login__button-login"
            disabled={ isDisabled }
            onClick={ sendLoginInfo }
          >
            Login
          </button>
          <button
            className="sign-up"
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Não tenho conta
          </button>
        </form>
      </div>
    );
  }

  switch (localStorageUser().role) {
  case 'administrator':
    return (
      <Navigate to="/admin/manage" replace />
    );
  case 'customer':
    return (
      <Navigate to="/customer/products" replace />
    );
  default:
    return (
      <Navigate to="/seller/orders" replace />
    );
  }
}
