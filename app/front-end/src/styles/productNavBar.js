import styled from 'styled-components';

export const Container = styled.header`
  border-bottom: solid 1px black;
  display: flex;
  justify-content: space-evenly;
  height: 70px;
  margin-bottom: 20px;
`;

export const Nav = styled.nav`
  align-items: center;
  display: flex;
`;

export const List = styled.ul`
  a {
    color: black;
    font-size: 25px;
    font-weight: bold;
    margin: 0 2.5rem;
    text-decoration: none;
  }

  @media(max-width: 440px) {
    a {
      font-size: 15px;
      margin: 0 0.5rem;
    }
  }

  @media(min-width: 441px) and (max-width: 540px) {
    a {
      font-size: 18px;
      margin: 0 0.75rem;
    }
  }

  @media(min-width: 541px) and (max-width: 720px) {
    a {
      font-size: 20px;
      margin: 0 1rem;
    }
  }

  @media(min-width: 721px) and (max-width: 1080px) {
    a {
      font-size: 22px;
      margin: 0 1.2rem;
    }
  }
`;

export const RightSide = styled.div`
  align-self: center;
  display: flex;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-right: 30px;

  @media(max-width: 720px) {
    display: none;
  }

  @media(min-width: 721px) and (max-width: 1080px) {
    font-size: 22px;
  }
`;

export const Logout = styled.button`
  @media(max-width: 720px) {
    margin-right: 15px;
  }

  @media(max-width: 440px) {
    font-size: 15px;
    height: 25px;
    width: 80px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 18px;
    height: 25px;
    width: 100px;
  }

  @media(min-width: 541px) and (max-width: 720px) {
    font-size: 20px;
    height: 28px;
    width: 120px;
  }

  @media(min-width: 721px) and (max-width: 1080px) {
    font-size: 22px;
    height: 28px;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    width: 120px;
  }

  @media(min-width: 1081px) {
    margin-left: 1.4rem;
  }

  background: #23022e;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  height: 30px;
  width: 150px;

  &:hover {
    cursor: pointer;
  }
`;
