import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../utils/api/service';
import { setLocalStorageUser } from '../utils/localStorage/localStorage';

import '../styles/register.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reveal, setReveal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    toast.success(`
      Para ativar o botão de cadastro:
      Preencha todos os campos, a senha deve conter ao menos uma letra maiúscula,
      uma minúscula, no mínimo 8 e no máximo 64 caracteres de comprimento e um caractere
      especial. ( $*&@# )
    `);
  }, []);

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?[a-z]+$/;
      const PASSWORD_BODY = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])/;
      const PASSWORD_LENGTH = /(?:([0-9a-zA-Z$*&@#])(?!\1)){8,64}/;
      const passwordRegex = new RegExp(PASSWORD_BODY.source + PASSWORD_LENGTH.source);
      const minNameLength = 12;

      setIsDisabled(
        !passwordRegex.test(password) || !passwordRegex.test(confirmPassword)
        || !regex.test(email)
        || name.length < minNameLength,
      );
    };

    validateInputs();
  }, [password, email, name, confirmPassword]);

  const sendRegisterInfo = async () => {
    if (confirmPassword !== password) {
      return toast.warning('As senhas tem que ser iguais.');
    }

    const TWO_SECONDS = 2000;

    const userInfo = await register(name, email, password);

    if (!userInfo) {
      return toast.error('Usuário já cadastrado!');
    }

    toast.success('Cadastro efetuado com sucesso!');
    const { user, token } = userInfo;
    setLocalStorageUser({ ...user, token });
    setTimeout(() => navigate('/customer/products'), TWO_SECONDS);
  };

  return (
    <div>
      <form className="register-container">
        <label htmlFor="name-input" className="label-input">
          Nome
          <input
            data-testid="common_register__input-name"
            id="name-input"
            onChange={ ({ target }) => setName(target.value) }
            name="name"
            type="text"
            placeholder="Seu nome"
            value={ name }
          />
        </label>
        <label htmlFor="email-input" className="label-input">
          Email
          <input
            data-testid="common_register__input-email"
            id="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            name="email"
            type="text"
            value={ email }
            placeholder="customer@deliveryapp.com"
          />
        </label>
        <label htmlFor="password-input" className="label-input">
          Senha
          <input
            data-testid="common_register__input-password"
            id="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            name="password"
            type={ reveal ? 'text' : 'password' }
            value={ password }
            placeholder="********"
          />
          <button
            type="button"
            className="password-button"
            onClick={ (() => setReveal(!reveal)) }
          >
            {
              reveal ? <img src="https://img.icons8.com/ios/50/000000/visible--v1.png" alt="revelar senha" />
                : <img src="https://img.icons8.com/ios/50/000000/hide.png" alt="ocultar senha" />
            }
          </button>
        </label>
        <label htmlFor="confirm-password-input" className="label-input">
          Confirmar Senha
          <input
            id="confirm-password-input"
            type={ reveal ? 'text' : 'password' }
            value={ confirmPassword }
            onChange={ ({ target }) => setConfirmPassword(target.value) }
            name="confirm-password"
            placeholder="********"
          />
        </label>
        <button
          className={ isDisabled ? 'create-button-disabled' : 'create-button' }
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          type="button"
          onClick={ sendRegisterInfo }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
