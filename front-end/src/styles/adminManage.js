import styled from 'styled-components';

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 0.3rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  text-align: center;
`;

export const Input = styled.input`
  border: solid 1px #000;
  border-radius: 0.25rem;
  height: 1.5rem;
  text-align: center;
`;

export const Select = styled.select`
  border: solid 1px #000;
  border-radius: 0.25rem;
  height: 1.5rem;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  align-self: center;
  background: #22023a;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1rem;
  height: 1.5rem;
  margin-top: 0.4rem;
  width: 7.5rem;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background: #ada8b6;
    color: #000;
  }
`;
