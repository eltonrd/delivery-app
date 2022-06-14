const FIRST = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
const SECOND = 'eyJuYW1lIjoiSm_Do28gZG9zIHRlc3RlcyIsImVtYWlsIjoidGVzdGVfdGVzdGVAdGVzd';
const THIRD = 'GUuY29tLmJyIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjU1MjI4NzA4LCJleHAiOjE2';
const FOURTH = 'NjQwMTI3MDh9.F8JVybqh3fQ-YVIiwph88cFF1Ql_7D8twJ8JTqzKoW0';
const AUTH = `${FIRST}${SECOND}${THIRD}${FOURTH}`;

const createdCustomer = {
  user: {
    name: 'João dos testes',
    email: 'teste_teste@teste.com.br',
    role: 'customer',
  },
  token: AUTH,
};

export default createdCustomer;
