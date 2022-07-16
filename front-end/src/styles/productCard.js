import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  border: solid 2px red;
  display: flex;
  flex-direction: column;
  height: 220px;
  margin-bottom: 1.5rem;
  width: 300px;

  button {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Img = styled.img`
  height: 80px;
  margin-bottom: 0.5rem;
  width: 80px;

  &:hover {
    cursor: pointer;
  }
`;

export const Description = styled.span`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Currency = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const CartButtonContainer = styled.div`
  display: flex;
`;

export const CartButtonLeft = styled.button`
  background: #23022e;
  border: solid 1px black;
  border-radius: 25%;
  color: #fff;
  font-size: 1.5rem;
  height: 25px;
  margin-right: 30px;
  margin-top: 0.5rem;
  text-align: center;
  width: 30px;
`;

export const CartButtonRight = styled.button`
  background: #23022e;
  border: solid 1px black;
  border-radius: 25%;
  color: #fff;
  font-size: 1.5rem;
  height: 25px;
  margin-left: 30px;
  margin-top: 0.5rem;
  text-align: center;
  width: 30px;
`;

export const ProductQuantity = styled.input`
  border: solid 1px black;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  height: 25px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 150px;
`;

export const ProductSection = styled.section`
  align-items: center;
  border: solid 2px green;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 120vh;
  width: 100%;
`;
