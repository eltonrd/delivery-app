import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api/service';

export default function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRegisterWrong, setIsRegisterWrong] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?[a-z]+$/;
      const minPasswordLength = 6;
      const minNameLength = 12;

      setIsDisabled(
        password.length < minPasswordLength
        || !regex.test(email)
        || name.length < minNameLength,
      );
    };

    validateInputs();
  }, [password, email, name]);

  const sendRegisterInfo = async () => {
    const isCreated = await register(name, email, password);

    if (!isCreated) {
      setIsRegisterWrong(true);
    } else {
      navigate('/customer/products');
    }
  };

  return (
    <div>
      <form>
        Cadastro:
        <label htmlFor="name-input">
          Nome
          <input
            data-testid="common_register__input-name"
            id="name-input"
            onChange={ ({ target }) => setName(target.value) }
            name="name"
            type="text"
          />
        </label>
        <label htmlFor="email-input">
          Email
          <input
            data-testid="common_register__input-email"
            id="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            name="email"
            type="text"
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            data-testid="common_register__input-password"
            id="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            name="password"
            type="password"
          />
        </label>
        <button
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          type="button"
          onClick={ sendRegisterInfo }
        >
          Cadastrar
        </button>
      </form>
      {
        isRegisterWrong
        && (
          <div data-testid="common_register__element-invalid_register">
            Usuário já cadastrado!
          </div>
        )
      }
    </div>
  );
}
