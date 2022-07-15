import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { login } from '../utils/api/service';
import {
  setLocalStorageUser,
  localStorageUser,
} from '../utils/localStorage/localStorage';
import * as S from '../styles/login';
import * as H from '../styles/loginHeader';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [reveal, setReveal] = useState(false);

  const navigate = useNavigate();

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
      <>
        <H.Container>
          <H.Title>
            Até as 17h Delivery App
          </H.Title>
          <H.Theme htmlFor="theme">
            <input type="checkbox" role="switch" name="theme-hanlder" id="theme" />
            <span />
          </H.Theme>
        </H.Container>
        <S.Container>
          <S.Form>
            <S.Label htmlFor="login-input">
              Email
              <S.Input
                data-testid="common_login__input-email"
                id="login-input"
                name="login"
                onChange={ ({ target }) => setEmail(target.value) }
                type="text"
                placeholder="customer@deliveryapp.com"
              />
            </S.Label>
            <S.Label htmlFor="password-input">
              Senha
              <S.Input
                data-testid="common_login__input-password"
                id="password-input"
                name="password"
                onChange={ ({ target }) => setPassword(target.value) }
                type={ reveal ? 'text' : 'password' }
                placeholder="********"
              />
              <S.RevealPassword
                type="button"
                onClick={ () => setReveal(!reveal) }
              >
                {
                  reveal ? <IoEyeOffOutline /> : <IoEyeOutline />
                }
              </S.RevealPassword>
            </S.Label>
            <S.LoginButton
              type="button"
              data-testid="common_login__button-login"
              onClick={ sendLoginInfo }
            >
              Login
            </S.LoginButton>
            <S.SignupButton
              type="button"
              data-testid="common_login__button-register"
              onClick={ () => navigate('/register') }
            >
              Não tenho conta
            </S.SignupButton>
          </S.Form>
        </S.Container>
        <footer>Eu sou o footer</footer>
      </>
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
