import React from 'react';
import Theme from '../styles/switch';

export default function Switch() {
  return (
    <Theme htmlFor="theme">
      <input type="checkbox" role="switch" name="theme-handler" id="theme" />
      <span />
    </Theme>
  );
}
