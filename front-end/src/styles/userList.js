import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
`;

export const Table = styled.table`
  border-radius: 0.25rem;
  box-shadow: 1px 1px 3px 2px #777;
  font-size: 1.5rem;
  text-align: center;
  width: 90%;

  @media(max-width: 440px) {
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

  @media(min-width: 1001px) and (max-width: 1200px) {
    font-size: 1.25rem;
  }
`;

export const DeleteUserButton = styled.button`
  background: #22023a;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1.25rem;
  height: 1.5rem;
  width: 5.5rem;

  @media(max-width: 440px) {
    font-size: 0.6rem;
    height: 0.75rem;
    width: 3rem;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 0.7rem;
    height: 0.9rem;
    width: 3.5rem;
  }

  @media(min-width: 541px) and (max-width: 680px) {
    font-size: 0.8rem;
    height: 1rem;
    width: 4rem;
  }

  @media(min-width: 681px) and (max-width: 800px) {
    font-size: 0.9rem;
    height: 1.1rem;
    width: 4.5rem;
  }

  @media(min-width: 801px) and (max-width: 1000px) {
    font-size: 1rem;
    height: 1.25rem;
    width: 5rem;
  }

  @media(min-width: 1001px) and (max-width: 1200px) {
    font-size: 1.25rem;
    height: 1.35rem;
    width: 6rem;
  }
`;
