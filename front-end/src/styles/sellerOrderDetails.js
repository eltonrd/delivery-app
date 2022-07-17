import styled from 'styled-components';

export const Details = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;

  @media(max-width: 440px) {
    font-size: 1.25rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 1.3rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 1.4rem;
  }

  @media(min-width: 681px) and (max-width: 760px) {
    font-size: 1.5rem;
  }

  @media(min-width: 761px) and (max-width: 940px) {
    font-size: 1.65rem;
  }
`;

export const OrderContainer = styled.div`
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0.5px 0.5px 2px 1px #777;
  display: flex;
  justify-content: space-around;
  margin-left: 2rem;
  width: 90%;
`;

export const LeftSide = styled.div`
  align-self: center;
  box-sizing: border-box;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem 0;
  text-align: center;

  @media(max-width: 440px) {
    font-size: 0.55rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.6rem;
  }

  @media(min-width: 541px) and (max-width: 700px) {
    font-size: 0.7rem;
  }

  @media(min-width: 701px) and (max-width: 840px) {
    font-size: 0.8rem;
  }

  @media(min-width: 841px) and (max-width: 960px) {
    font-size: 0.9rem;
  }

  @media(min-width: 961px) and (max-width: 1100px) {
    font-size: 1rem;
  }
`;

export const Button = styled.button`
  background: #22023a;
  border: none;
  border-radius: 0.15rem;
  color: #fff;
  font-size: 1.1rem;
  height: 1.75rem;
  margin-top: 0.3rem;
  width: 12rem;

  &:disabled {
    background: #ada8b6;
    color: #000;
  }

  &:hover {
    cursor: pointer;
  }

  @media(max-width: 440px) {
    font-size: 0.4rem;
    height: 0.75rem;
    width: 4.5rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.5rem;
    height: 0.85rem;
    width: 5.5rem;
  }

  @media(min-width: 541px) and (max-width: 700px) {
    font-size: 0.55rem;
    height: 1rem;
    width: 6rem;
  }

  @media(min-width: 701px) and (max-width: 840px) {
    font-size: 0.6rem;
    height: 0.9rem;
    width: 6.5rem;
  }

  @media(min-width: 841px) and (max-width: 960px) {
    font-size: 0.65rem;
    height: 1rem;
    width: 7rem;
  }

  @media(min-width: 961px) and (max-width: 1100px) {
    font-size: 0.7rem;
    height: 1.2rem;
    width: 8rem;
  }
`;

export const Table = styled.table`
  font-size: 1.1rem;
  text-align: center;
  width: 55%;

  @media(max-width: 440px) {
    font-size: 0.4rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.5rem;
  }

  @media(min-width: 541px) and (max-width: 700px) {
    font-size: 0.6rem;
  }

  @media(min-width: 701px) and (max-width: 840px) {
    font-size: 0.7rem;
  }

  @media(min-width: 841px) and (max-width: 960px) {
    font-size: 0.8rem;
  }

  @media(min-width: 961px) and (max-width: 1100px) {
    font-size: 0.9rem;
  }
`;

export const Price = styled.h1`
  @media(max-width: 440px) {
    font-size: 0.5rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.6rem;
  }

  @media(min-width: 541px) and (max-width: 700px) {
    font-size: 0.7rem;
  }

  @media(min-width: 701px) and (max-width: 840px) {
    font-size: 0.8rem;
  }

  @media(min-width: 701px) and (max-width: 840px) {
    font-size: 0.9rem;
  }

  @media(min-width: 701px) and (max-width: 840px) {
    font-size: 1rem;
  }
`;
