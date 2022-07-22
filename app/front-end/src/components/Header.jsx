import React from 'react';
import * as S from '../styles/loginHeader';
import Switch from './Switch';

export default function Header() {
  return (
    <S.Container>
      <S.Title>
        Até as 17h Delivery App
      </S.Title>
      <Switch />
    </S.Container>
  );
}
