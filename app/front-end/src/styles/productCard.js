import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  border-radius: 8px;
  box-shadow: 1.5px 1.5px 5px 1px #23231A;
  display: flex;
  flex-direction: column;
  height: 250px;
  margin-bottom: 1.5rem;
  width: 350px;

  @media(max-width: 360px) {
    height: 150px;
    width: 200px;
  }

  @media(min-width: 361px) and (max-width: 440px) {
    height: 150px;
    width: 175px;
  }
  
  @media(min-width: 441px) and (max-width: 540px) {
    height: 170px;
    width: 200px;
  }

  @media(min-width: 541px) and (max-width: 720px) {
    height: 200px;
    width: 200px;
  }

  @media(min-width: 721px) and (max-width: 840px) {
    height: 220px;
    width: 230px;
  }

  @media(min-width: 841px) and (max-width: 1080px) {
    height: 220px;
    width: 275px;
  }

  @media(min-width: 1081px) and (max-width: 1200px) {
    height: 250px;
    width: 320px;
  }

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

  @media(max-width: 440px) {
    height: 50px;
    width: 50px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    height: 60px;
    width: 60px;
  }

  @media(min-width: 541px) and (max-width: 840px) {
    height: 70px;
    width: 70px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Description = styled.span`
  font-size: 20px;
  font-weight: bold;
  text-align: center;

  @media(max-width: 440px) {
    font-size: 12px;
  }

  @media(min-width: 441px) and (max-width: 720px) {
    font-size: 15px;
  }

  @media(min-width: 721px) and (max-width: 840px) {
    font-size: 18px;
  }
`;

export const Currency = styled.p`
  font-size: 20px;
  font-weight: bold;

  @media(max-width: 440px) {
    font-size: 12px;
  }

  @media(min-width: 441px) and (max-width: 720px) {
    font-size: 15px;
  }

  @media(min-width: 721px) and (max-width: 840px) {
    font-size: 18px;
  }
`;

export const CartButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const CartButtonLeft = styled.button`
  background: #23022e;
  border: solid 1px black;
  border-radius: 25%;
  color: #fff;
  font-size: 1.5rem;
  height: 30px;
  margin-right: 30px;
  margin-top: 0.5rem;
  text-align: center;
  width: 30px;

  @media(max-width: 440px) {
    font-size: 0.8rem;
    height: 20px;
    width: 25px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 1rem;
    height: 22px;
    width: 25px;
  }

  @media(min-width: 541px) and (max-width: 720px) {
    font-size: 1.2rem;
    height: 25px;
    width: 25px;
  }

  @media(min-width: 721px) and (max-width: 840px) {
    font-size: 1.3rem;
    height: 28px;
    width: 28px;
  }
`;

export const CartButtonRight = styled.button`
  background: #23022e;
  border: solid 1px black;
  border-radius: 25%;
  color: #fff;
  font-size: 1.5rem;
  height: 30px;
  margin-left: 30px;
  margin-top: 0.5rem;
  text-align: center;
  width: 30px;

  @media(max-width: 440px) {
    font-size: 0.8rem;
    height: 20px;
    width: 20px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 1rem;
    height: 22px;
    width: 22px;
  }

  @media(min-width: 541px) and (max-width: 720px) {
    font-size: 1.2rem;
    height: 25px;
    width: 25px;
  }

  @media(min-width: 721px) and (max-width: 840px) {
    font-size: 1.3rem;
    height: 28px;
    width: 28px;
  }
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

  @media(max-width: 440px) {
    font-size: 12px;
    height: 15px;
    width: 80px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 15px;
    height: 18px;
    width: 100px;
  }

  @media(min-width: 541px) and (max-width: 720px) {
    font-size: 18px;
    height: 20px;
    width: 120px;
  }

  @media(min-width: 721px) and (max-width: 840px) {
    font-size: 20px;
    height: 30px;
    width: 150px;
  }
`;

export const ProductSection = styled.section`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;
