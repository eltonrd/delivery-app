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
  border-radius: 0.5rem;
  box-shadow: 0.5px 0.5px 2px 1px #777;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
  width: 90%;
`;

export const CompanyInfo = styled.div`
  align-items: center;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media(max-width: 360px) {
    font-size: 0.6rem;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 0.75rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.8rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.9rem;
  }

  @media(min-width: 681px) and (max-width: 760px) {
    font-size: 1rem;
  }

  @media(min-width: 761px) and (max-width: 940px) {
    font-size: 1.2rem;
  }
`;

export const OrderId = styled.div`
  margin-left: 1rem;
`;

export const DeliveryButton = styled.button`
  margin-right: 1rem;
  background: #22023a;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  height: 2rem;
  width: 9rem;

  &:disabled {
    background: #ada8b6;
    color: #000;
  }

  &:hover {
    cursor: pointer;
  }

  @media(max-width: 440px) {
    font-size: 0.5rem;
    height: 1.25rem;
    width: 4rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.6rem;
    height: 1.4rem;
    width: 4.5rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.65rem;
    height: 1.5rem;
    width: 5rem;
  }

  @media(min-width: 681px) and (max-width: 760px) {
    font-size: 0.75rem;
    height: 1.75rem;
    width: 6.5rem;
  }

  @media(min-width: 761px) and (max-width: 940px) {
    font-size: 0.85rem;
    height: 1.9rem;
    width: 7.25rem;
  }
`;

export const Price = styled.h1`
  font-size: 1.5rem;
  margin: 0.4rem;
  margin-right: 0.4rem;
  text-align: end;

  @media(max-width: 440px) {
    font-size: 0.6rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.75rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.8rem;
  }

  @media(min-width: 681px) and (max-width: 760px) {
    font-size: 1rem;
  }

  @media(min-width: 761px) and (max-width: 940px) {
    font-size: 1.2rem;
  }
`;
