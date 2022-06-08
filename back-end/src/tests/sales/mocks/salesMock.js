const createdSale = {
	id: 1,
	products: [
		{
			id: 8,
			quantity: 9
		}
	]
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjU0NjQyNTc1LCJleHAiOjE2NjM0MjY1NzV9.udeFrYVoYA0lyc4CaogAhgSWOjtSuM3ObQ3oavpPli4';

const validSale = {
	"totalPrice": 89.07,
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"products": [{ "id": 8, "quantity": 9 }],
	"sellerId": 2
};

const saleWithoutTotalPrice = {
  "deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"products": [{ "id": 8, "quantity": 9 }],
	"sellerId": 2
};

const saleWithoutProducts = {
  "totalPrice": 89.07,
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"sellerId": 2
};

const saleWithouProductsProperties = {
  "totalPrice": 89.07,
  "deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"products": [{ "quantity": 9 }],
	"sellerId": 2
}

module.exports = {
  createdSale,
  token,
  validSale,
  saleWithoutTotalPrice,
  saleWithoutProducts,
  saleWithouProductsProperties,
};
