const orders = [
	{
		"id": 1,
		"totalPrice": "89.07",
		"deliveryAddress": "Rua dos testes",
		"deliveryNumber": "1305",
		"saleDate": "2022-06-07T20:26:18.000Z",
		"status": "pendente",
		"userId": 3,
		"sellerId": 2
	},
	{
		"id": 2,
		"totalPrice": "122.50",
		"deliveryAddress": "Rua dos testes",
		"deliveryNumber": "1305",
		"saleDate": "2022-06-07T20:26:39.000Z",
		"status": "pendente",
		"userId": 3,
		"sellerId": 2
	},
	{
		"id": 3,
		"totalPrice": "68.99",
		"deliveryAddress": "Rua dos testes",
		"deliveryNumber": "1305",
		"saleDate": "2022-06-07T20:27:06.000Z",
		"status": "pendente",
		"userId": 3,
		"sellerId": 2
	}
];

const userOrderById = {
	"id": 1,
	"totalPrice": "89.07",
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"saleDate": "2022-06-07T20:26:18.000Z",
	"status": "pendente",
	"userId": 3,
	"sellerId": 2,
};

const sellerOrderById = {
	"id": 2,
	"totalPrice": "122.50",
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"saleDate": "2022-06-07T20:26:39.000Z",
	"status": "pendente",
	"userId": 3,
	"sellerId": 2
};

const userIdConflictOrder = {
	"id": 1,
	"totalPrice": "89.07",
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"saleDate": "2022-06-07T20:26:18.000Z",
	"status": "Preparando",
	"userId": 2,
	"sellerId": 2
}

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTQ2MzM1NDcsImV4cCI6MTY1NDcxOTk0N30.of4ZlCTkz9lONxQ-Vqtr7c5tGTH-XSmETuFyxNe1Qpg';

const sellerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjU4MTA4NzQwLCJleHAiOjE2NjY4OTI3NDB9.UCuaHUWn-8R2gVv4AWcVQugMSYCmNuDMpt1LabBayWo';

module.exports = {
  orders,
  userToken,
  userOrderById,
  sellerToken,
  sellerOrderById,
  userIdConflictOrder,
};
