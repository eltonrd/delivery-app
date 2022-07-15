import React from 'react';
import * as S from '../styles/loginHeader';

export default function Header() {
  return (
    <S.Container>
      <S.Title>
        Até as 17h Delivery App
      </S.Title>
      <S.Theme htmlFor="theme">
        <input type="checkbox" role="switch" name="theme-handler" id="theme" />
        <span />
      </S.Theme>
    </S.Container>
  );
}
