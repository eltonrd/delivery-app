const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { User, Sale, SaleProduct } = require('../../database/models');
const app = require('../../api/app');
const {
  createdSale,
  validSale,
  token,
  saleWithoutTotalPrice,
  saleWithoutProducts,
  saleWithouProductsProperties,
} = require('./mocks/salesMock');
const { userDbResponse } = require('../users/mocks/loginMocks');

chai.use(chaiHttp);
const { expect } = chai;
const SALES_ROUTE = '/sales';

describe('Test POST /sales endpoint', () => {
  let res;
  describe('Create sale successfully', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDbResponse);
      sinon.stub(Sale, 'create').resolves(createdSale);
      sinon.stub(SaleProduct, 'create').resolves({});
    });
    after(() => {
      (User.findOne).restore();
      (Sale.create).restore();
      (SaleProduct.create).restore();
    });
    it('Should return http status 201 and object', async () => {
      res = await chai.request(app).post(SALES_ROUTE)
        .send(validSale).set({ authorization: token });
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.an('object').to.include.all.keys(['id', 'products']);
      expect(res.body.products).to.be.an('array');
    });
  });

  describe('Cannot create a sale', () => {
    describe('Send an invalid or expired token', () => {
      it('Should return http status 401 and an object with message property', async () => {
        res = await chai.request(app).post(SALES_ROUTE).send(validSale);
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('Invalid token');
      });
    });

    describe('Send a valid token however user does not exist', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => (User.findOne).restore());

      it('Should return http status 404 and object with message property', async () => {
        res = await chai.request(app).post(SALES_ROUTE)
          .send(validSale).set({ authorization: token });
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('User does not exist');
      });
    });

    describe('Send an invalid sale request missing totalPrice field', () => {
      before(async () => { sinon.stub(User, 'findOne').resolves(userDbResponse) });
      after(() => (User.findOne).restore());

      it('Should return http status 400 and an object with message property', async () => {
        res = await chai.request(app).post(SALES_ROUTE)
          .send(saleWithoutTotalPrice).set({ authorization: token });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('totalPrice must be filled');
      });
    });

    describe('Send an invalid sale request missing products field', () => {
      before(async () => { sinon.stub(User, 'findOne').resolves(userDbResponse) });
      after(() => (User.findOne).restore());

      it('Should return http status 400 and an object with message property', async () => {
        res = await chai.request(app).post(SALES_ROUTE)
          .send(saleWithoutProducts).set({ authorization: token });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('product must be in an array');
      });

      it('Should return http status 400 because products object is missing properties',
        async() => {
          res = await chai.request(app).post(SALES_ROUTE)
            .send(saleWithouProductsProperties).set({ authorization: token });
          expect(res.status).to.be.equal(400);
          expect(res.body).to.be.an('object').to.have.own.property('message');
          expect(res.body.message).to.be.equal('product id must be filled');
      });
    });
  });
});
