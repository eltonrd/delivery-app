import styled from 'styled-components';

export const Container = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const OrderTitle = styled.h1`
  align-self: center;
  font-size: 1.5rem;
  font-weight: unset;
  margin-bottom: 1rem;

  @media(max-width: 360px) {
    font-size: 0.8rem;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 0.9rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 1rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 1.1rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 1.25rem;
  }

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1.35rem;
  }
`;

export const OrderTotal = styled.h1`
  align-self: center;
  background: #ddd;
  border-radius: 4px;
  color: #000;
  font-weight: 400;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 10rem;

  @media(max-width: 360px) {
    font-size: 0.8rem;
    width: 6rem;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 0.9rem;
    width: 6rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 1rem;
    width: 6.75rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 1.1rem;
    width: 7.5rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 1.25rem;
    width: 9rem;
  }

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1.35rem;
    width: 9.5rem;
  }
`;

export const TableContainer = styled.div`
  align-self: center;
  border-radius: 4px;
  box-shadow: 0.5px 0.5px 2.5px 0.75px #777;
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const Table = styled.table`
  align-self: center;
  margin-top: 0.5rem;
  width: 100%;
`;

export const TableHead = styled.thead`
  font-size: 1.5rem;

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

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

export const TableBody = styled.tbody`
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

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

export const RemoveButton = styled.button`
  background: #22023a;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1.25rem;
  height: 1.75rem;
  width: 7rem;

  &:hover {
    cursor: pointer;
  }

  @media(max-width: 360px) {
    font-size: 0.5rem;
    height: 1rem;
    width: 2.25rem;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    font-size: 0.6rem;
    height: 1rem;
    width: 2.6rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.8rem;
    height: 1.1rem;
    width: 3.5rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.9rem;
    height: 1.2rem;
    width: 4rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 1rem;
    heigth: 1.2rem;
    width: 4.5rem;
  }

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1.1rem;
    height: 1.25rem;
    width: 5rem;
  }
`;
