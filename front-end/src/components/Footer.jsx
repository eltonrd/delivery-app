import React from 'react';

import * as S from '../styles/loginFooter';
import githubLink from '../utils/social';

export default function Footer() {
  return (
    <S.Footer>
      <S.LeftSide>
        <span>Feito antes das 17h pelo grupo</span>
      </S.LeftSide>
      {
        githubLink.map(({ href, name, src }, i) => (
          <a target="_blank" href={ href } key={ i } rel="noreferrer">
            <img src={ src } alt="teste" />
            <span>{ name }</span>
          </a>
        ))
      }
    </S.Footer>
  );
}
