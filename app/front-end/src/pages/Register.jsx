import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { register } from '../utils/api/service';
import { setLocalStorageUser } from '../utils/localStorage/localStorage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as S from '../styles/register';
import ToastMessage from '../utils/helpers/toastifyMessage';

import 'react-toastify/dist/ReactToastify.css';

const TOASTIFY_POSITION = 'top-center';

export default function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reveal, setReveal] = useState(false);

  const navigate = useNavigate();

  const resetState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const validatePassword = (pass, confirm) => {
    const PASSWORD_BODY = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])/;
    const PASSWORD_LENGTH = /(?:([0-9a-zA-Z$*&@#])(?!\1)){8,64}/;
    const regex = new RegExp(PASSWORD_BODY.source + PASSWORD_LENGTH.source);
    if (!regex.test(pass) || !regex.test(confirm)) {
      return false;
    }
    return true;
  };

  const sendRegisterInfo = async () => {
    if (confirmPassword !== password) {
      return toast.warning('As senhas informadas não são iguais.');
    }

    if (!validatePassword(password, confirmPassword)) {
      return toast.warning(<ToastMessage />,
        { theme: 'dark', position: TOASTIFY_POSITION });
    }

    const TWO_SECONDS = 2000;

    const userInfo = await register(name, email, password);

    if (!userInfo) {
      return toast.error('Usuário já cadastrado!',
        { theme: 'dark', position: TOASTIFY_POSITION });
    }

    toast.success('Cadastro efetuado com sucesso!',
      { theme: 'dark', position: TOASTIFY_POSITION });
    resetState();
    const { user, token } = userInfo;
    setLocalStorageUser({ ...user, token });
    setTimeout(() => navigate('/customer/products'), TWO_SECONDS);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Label htmlFor="name-input">
          Nome
          <S.Input
            data-testid="common_register__input-name"
            id="name-input"
            onChange={ ({ target }) => setName(target.value) }
            name="name"
            type="text"
            placeholder="Seu nome"
            value={ name }
          />
        </S.Label>
        <S.Label htmlFor="email-input">
          Email
          <S.Input
            data-testid="common_register__input-email"
            id="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            name="email"
            type="text"
            value={ email }
            placeholder="customer@deliveryapp.com"
          />
        </S.Label>
        <S.Label htmlFor="password-input">
          Senha
          <S.Input
            data-testid="common_register__input-password"
            id="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            name="password"
            type={ reveal ? 'text' : 'password' }
            value={ password }
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
        <S.Label htmlFor="confirm-password-input">
          Confirmar Senha
          <S.Input
            id="confirm-password-input"
            type={ reveal ? 'text' : 'password' }
            value={ confirmPassword }
            onChange={ ({ target }) => setConfirmPassword(target.value) }
            name="confirm-password"
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
        <S.Button
          data-testid="common_register__button-register"
          type="button"
          onClick={ sendRegisterInfo }
        >
          Cadastrar
        </S.Button>
      </S.Container>
      <Footer />
    </>
  );
}
