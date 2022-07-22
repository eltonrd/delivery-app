import React from 'react';

export default function ToastMessage() {
  return (
    <div>
      <span>A senha deve ter ao menos:</span>
      <br />
      <span>- 1 letra minúscula;</span>
      <br />
      <span>- 1 maiúscula;</span>
      <br />
      <span>- No mínimo 8 caracteres de compprimento;</span>
      <br />
      <span>- 1 caractere especial dentre esses ( $ * & @ # ).</span>
    </div>
  );
}
