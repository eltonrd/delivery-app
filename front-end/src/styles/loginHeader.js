import styled from 'styled-components';

export const Container = styled.header`
  align-items: center;
  border-bottom: solid 1px black;
  display: flex;
  font-size: 30px;
  height: 50px;
  justify-content: space-around;
`;

export const Title = styled.span`

`;

export const Theme = styled.label`
  align-items: center;
  align-self: center;
  background: pink;
  border-radius: 1rem;
  display: flex;
  height: 1rem;
  justify-content: center;
  position: relative;
  width: 2.25rem;

  input {
    cursor: pointer;
    height: 100%;
    opacity: 0;
    width: 100%;
  }


  span {
    background: #ada8b6;
    border-radius: 1rem;
    box-shadow: 1px 1px 5px 1px #000;
    cursor: pointer;
    left: 0;
    position: absolute;
    height: 1.2rem;
    width: 1.1rem;
  }

  input:checked + span {
    background: #23022e;
    height: 1.3rem;
    left: 60%;
    width: 1.2rem;
  }
`;
