import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  justify-content: space-around;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  text-align: center;

  @media(max-width: 360px) {
    font-size: 0.5rem;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 0.6rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.7rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.8rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  align-self: center;
  background: #ddd;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 500;
  height: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
  width: 12.5rem;

  &:hover {
    cursor: pointer;
  }

  @media(max-width: 440px) {
    font-size: 0.5rem;
    height: 1rem;
    width: 5rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.6rem;
    height: 1rem;
    width: 5.5rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.7rem;
    height: 1.1rem;
    width: 6rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 0.8rem;
    height: 1.2rem;
    width: 6.75rem;
  }
`;

export const Input = styled.input`
  align-self: center;
  background: #ddd;
  border: none;
  border-radius: 4px;
  font-size: 1.25rem;
  height: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
  width: 12.5rem;

  &::placeholder {
    color: #000;
    font-size: 1rem;
  }

  @media(max-width: 360px) {
    font-size: 0.5rem;
    height: 1rem;
    width: 5rem;

    &::placeholder {
      font-size: 0.4rem;
    }
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 0.6rem;
    height: 1rem;
    width: 5rem;

    &::placeholder {
      font-size: 0.45rem;
    }
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.7rem;
    height: 1rem;
    width: 5rem;

    &::placeholder {
      font-size: 0.45rem;
    }
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.6rem;
    height: 1.1rem;
    width: 6.5rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 0.75rem;
    height: 1.15rem;
    width: 7rem;

    &::placeholder {
      font-size: 0.6rem;
    }
  }

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 0.9rem;
    height: 1.2rem;
    width: 7.75rem;

    &::placeholder {
      font-size: 0.7rem;
    }
  }
`;

export const FinishOrderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const FinishOrderButton = styled.button`
  background: #22023a;
  border: none;
  border-radius: 8px;
  bottom: 1rem;
  color: #fff;
  font-size: 1.2rem;
  height: 2rem;
  position: fixed;
  width: 10rem;

  &:disabled {
    background: #ddd;
    color: #000;
  }

  &:hover {
    cursor: pointer;
  }
`;
