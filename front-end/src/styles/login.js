import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  width: 100%;
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

export const Input = styled.input`
  border: solid 1px black;
  border-radius: 4px;
  height: 30px;
  margin-top: 5px;
  text-align: center;
`;

export const LoginButton = styled.button`
  background: #ada8b6;
  border: 1px solid black;
  border-radius: 8px;
  color: #000;
  font-size: 15px;
  font-weight: bold;
  height: 30px;
  margin: 8px 0;
  width: 150px;

  &:hover {
    background: #23022e;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    height: 40px;
    transition: all 0.5s ease-in;
    width: 200px;
  }
`;

export const SignupButton = styled.button`
  background: #23022e;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  height: 30px;
  width: 150px;

  &:hover {
    cursor: pointer;
    font-size: 20px;
    height: 40px;
    transition: all 0.5s ease-in;
    width: 200px;
  }
`;
