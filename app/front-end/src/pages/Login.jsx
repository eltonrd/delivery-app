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
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      return toast.error('Email ou senha inválidos!',
        { theme: 'dark', position: 'top-center' });
    }

    const { user, token } = userInfo;
    setLocalStorageUser({ ...user, token });
    handleRole(user.role);
  };

  if (!localStorageUser()) {
    return (
      <>
        <Header />
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
                  reveal ? <IoEyeOutline /> : <IoEyeOffOutline />
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
        <Footer />
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
