import styled from 'styled-components';

const Button = styled.button`
  background: #23022e;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  height: 40px;
  width: 225px;

  @media(max-width: 1200px) {
    position: fixed;
    bottom: 0;
  }

  @media(max-width: 360px) {
    font-size: 12px;
    height: 30px;
    width: 150px;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 15px;
    height: 30px;
    width: 175px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 18px;
    height: 35px;
    width: 180px;
  }

  @media(min-width: 541px) and (max-width: 720px) {
    font-size: 20px;
    height: 35px;
    width: 200px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
