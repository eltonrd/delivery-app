import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-evenly;
  height: 70px;
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
`;

export const RightSide = styled.div`
  align-self: center;
  display: flex;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-right: 15px;
`;

export const Logout = styled.button`
  background: #23022e;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  height: 30px;
  margin-left: 15px;
  width: 150px;

  &:hover {
    cursor: pointer;
  }
`;
