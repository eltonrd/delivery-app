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
`;

export const OrderTotal = styled.h1`
  align-self: center;
  background: #ada8b6;
  border-radius: 4px;
  color: #000;
  font-weight: 400;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 10rem;
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
  font-size: 20px;
`;

export const TableBody = styled.tbody`
  font-size: 1.2rem;
  text-align: center;
`;

export const RemoveButton = styled.button`
  background: #22023a;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  height: 1.75rem;
  width: 7rem;

  &:hover {
    cursor: pointer;
  }
`;
