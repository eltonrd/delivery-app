import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Link = styled.a`
  align-items: center;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 5px 2px #777;
  color: black;
  display: flex;
  /* flex-direction: column; */
  font-size: 2rem;
  font-weight: bold;
  height: 5rem;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  text-align: center;
  text-decoration: none;
  width: 95%;

  @media(max-width: 440px) {
    font-size: 1rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 1.2rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 1.3rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 1.4rem;
  }

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1.5rem;
  }

  @media(min-width: 1001px) and (max-width: 1200px) {
    font-size: 1.75rem;
  }
`;

export const OrderInfo = styled.div`
  display: flex;

  p {
    margin: 0 0.5rem;
  }
  
  @media(max-width: 440px) {
    p {
      margin: 0 0.2rem;
    }
  }

  @media(min-width: 441px) and (max-width: 540px) {
    p {
      margin: 0 0.3rem;
    }
  }

  @media(min-width: 541px) and (max-width: 680px) {
    p {
      margin: 0 0.4rem;
    }
  }
`;
