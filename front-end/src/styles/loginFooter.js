import styled from 'styled-components';

export const Footer = styled.footer`
  align-items: center;
  bottom: 0;
  display: flex;
  font-size: 20px;
  height: 80px;
  justify-content: space-around;
  border-top: solid 1px black;
  width: 100%;

  @media(max-width: 360px) {
    a {
      font-size: 0.6rem;

      img {
        display: none;
      }
    }
  }

  @media(min-width: 361px) and (max-width: 440px) {
    a {
      font-size: 0.7rem;
    }

    img {
      display: none;
    }
  }

  @media(min-width: 441px) and (max-width: 540px) {
    a {
      font-size: 0.8rem;

      img {
        display: none;
      }
    }
  }

  @media(min-width: 541px) and (max-width: 720px) {
    a {
      font-size: 0.9rem;

      img {
        display: none;
      }
    }
  }

  @media(min-width: 721px) and (max-width: 800px) {
    a {
      font-size: 1rem;

      img {
        display: none;
      }
    }
  }

  @media(min-width: 801px) and (max-width: 1100px) {
    a {
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;

      img {
        height: 2.5rem;
        width: 2.5rem;
      }
    }
  }

  @media(min-width: 1101px) and (max-width: 1500px) {
    a {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
    }

    img {
      height: 2.75rem;
      width: 2.75rem;
    }
  }

  a {
    font-size: 0.8rem,;
  }

  img {
    align-self: center;
    border-radius: 50%;
    height: 2.8rem;
    width: 2.8rem;
  }

  a {
    color: black;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  font-size: 2rem;
  text-align: center;

  @media(max-width: 360px) {
    span {
      font-size: 0.6rem;
    }
  }

  @media(min-width: 361px) and (max-width: 440px) {
    span {
      font-size: 0.7rem;
    }
  }

  @media(min-width: 441px) and (max-width: 540px) {
    span {
      font-size: 0.8rem;
    }
  }

  @media(min-width: 541px) and (max-width: 720px) {
    span {
      font-size: 0.9rem;
    }
  }

  @media(min-width: 721px) and (max-width: 800px) {
    span {
      font-size: 1rem;
    }
  }

  @media(min-width: 801px) and (max-width: 1100px) {
    span {
      font-size: 1.2rem;
    }
  }

  @media(min-width: 1101px) and (max-width: 1300px) {
    span {
      font-size: 1.3rem;
    }
  }
`;
