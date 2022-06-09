import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login } from '../utils/api/service';
import RockGlass from '../images/rockGlass.svg';
import {
  setLocalStorageUser,
  localStorageUser,
} from '../utils/localStorage/localStorage';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoginWrong, setIsLoginWrong] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?[a-z]+$/;
      const minPasswordLength = 6;

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
      setIsLoginWrong(true);
    } else {
      const { user, token } = userInfo;
      setLocalStorageUser({ ...user, token });
      handleRole(user.role);
    }
  };

  if (!localStorageUser()) {
    return (
      <div>
        <img alt="logo app delivery" src={ RockGlass } width="100px" />
        <h1>Delivery App</h1>
        <form>
          <label htmlFor="login-input">
            Login
            <input
              data-testid="common_login__input-email"
              id="login-input"
              name="login"
              onChange={ ({ target }) => setEmail(target.value) }
              type="text"
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              data-testid="common_login__input-password"
              id="password-input"
              name="password"
              onChange={ ({ target }) => setPassword(target.value) }
              type="password"
            />
          </label>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ isDisabled }
            onClick={ sendLoginInfo }
          >
            Login
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Não tenho conta
          </button>
        </form>
        {
          isLoginWrong
          && (
            <div data-testid="common_login__element-invalid-email">
              Email ou senha invalidos!
            </div>
          )
        }
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
