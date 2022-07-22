import styled from 'styled-components';

export const TableContainer = styled.div`
  align-self: center;
  display: flex;
  width: 95%;
`;

export const Table = styled.table`
  font-size: 1.25rem;
  margin-top: 0.25rem;
  width: 100%;

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
    font-size: 0.75rem;
  }

  @media(min-width: 681px) and (max-width: 760px) {
    font-size: 0.9rem;
  }

  @media(min-width: 761px) and (max-width: 940px) {
    font-size: 1rem;
  }
`;

export const TableBody = styled.tbody`
  font-size: 1.25rem;
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
    font-size: 0.75rem;
  }

  @media(min-width: 681px) and (max-width: 760px) {
    font-size: 0.9rem;
  }

  @media(min-width: 761px) and (max-width: 940px) {
    font-size: 1rem;
  }
`;
