import styled from 'styled-components';

export const Details = styled.h1`
  margin-left: 2rem;
  margin-bottom: 0.5rem;
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
  margin-top: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
`;

export const Price = styled.h1`
  font-size: 1.5rem;
  margin: 0.4rem;
  margin-right: 0.4rem;
  text-align: end;
`;
