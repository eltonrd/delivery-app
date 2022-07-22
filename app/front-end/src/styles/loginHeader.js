import styled from 'styled-components';

export const Container = styled.header`
  align-items: center;
  border-bottom: solid 1px black;
  display: flex;
  font-size: 30px;
  height: 50px;
  justify-content: space-around;
`;

export const Title = styled.span`
  @media(max-width: 400px) {
    font-size: 20px;
  }

  @media(min-width: 401px) and (max-width: 440px) {
    font-size: 22px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 25px;
  }

  @media(min-width: 541px) and (max-width: 840px) {
    font-size: 28px;
  }
`;
