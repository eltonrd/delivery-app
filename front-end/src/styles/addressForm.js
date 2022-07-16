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
`;

export const Input = styled.input`
  align-self: center;
  background: #ddd;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  height: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
  width: 12.5rem;

  &::placeholder {
    color: #000;
    font-size: 1rem;
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
  color: #fff;
  font-size: 1.2rem;
  height: 2rem;
  width: 10rem;

  &:disabled {
    background: #ddd;
    color: #000;
  }

  &:hover {
    cursor: pointer;
  }
`;
