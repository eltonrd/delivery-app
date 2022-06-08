const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { Product } = require('../../database/models');
const app = require('../../api/app');
const { products } = require('./mocks/productsMock');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test GET /customer/products endpoint', () => {
  let res;
  before(async () => sinon.stub(Product, 'findAll').resolves(products));
  after(() => (Product.findAll).restore());
  it('Should return http status 200 and an array', async () => {
    res = await chai.request(app).get('/customer/products');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array').to.have.length(11);
    expect(res.body[0]).to.include.all.keys(['id', 'name', 'price', 'urlImage']);
  });
});
