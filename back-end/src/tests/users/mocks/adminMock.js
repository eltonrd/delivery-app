const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE2NTQ2NDI1NTEsImV4cCI6MTY2MzQyNjU1MX0.nRUbTMZoj3kwA8ZO5dQSqXwjSFB1fLH9rzXpT4vczOw';

const notAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjU0NjQyNTc1LCJleHAiOjE2NjM0MjY1NzV9.udeFrYVoYA0lyc4CaogAhgSWOjtSuM3ObQ3oavpPli4';

const users = [
	{
		"id": 1,
		"name": "Delivery App Admin",
		"email": "adm@deliveryapp.com",
		"password": "a4c86edecc5aee06eff8fdeda69e0d04",
		"role": "administrator"
	},
	{
		"id": 2,
		"name": "Fulana Pereira",
		"email": "fulana@deliveryapp.com",
		"password": "3c28d2b0881bf46457a853e0b07531c6",
		"role": "seller"
	},
	{
		"id": 3,
		"name": "Cliente Zé Birita",
		"email": "zebirita@email.com",
		"password": "1c37466c159755ce1fa181bd247cb925",
		"role": "customer"
	},
	{
		"id": 4,
		"name": "João dos testes",
		"email": "teste_teste@teste.com.br",
		"password": "25d55ad283aa400af464c76d713c07ad",
		"role": "customer"
	},
	{
		"id": 5,
		"name": "João dos testes",
		"email": "test@test.com",
		"password": "add41065b615eebe95737998dc2fbe86",
		"role": "customer"
	}
];

const newValidUser = {
  email: 'test@test.com',
  password: 'senha*dificil',
  name: 'João dos testes',
  role: 'seller',
};

module.exports ={ token, users, notAdminToken, newValidUser };
