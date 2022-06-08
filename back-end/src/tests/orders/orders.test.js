const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { Sale, User } = require('../../database/models');
const app = require('../../api/app');
const {
  orders,
  userToken,
  userOrderById,
  sellerToken,
  sellerOrderById,
  userIdConflictOrder,
} = require('./mocks/ordersMock');
const { userDbResponse, sellerDbResponse } = require('../users/mocks/loginMocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test GET /customer/orders endpoint', () => {
  let res;
  describe('List all orders from an user', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDbResponse);
      sinon.stub(Sale, 'findAll').resolves(orders);
    });
    after(() => {
      (User.findOne).restore();
      (Sale.findAll).restore();
    });

    it('Should http status 200 and an array', async () => {
      res = await chai.request(app)
        .get('/customer/orders').set({ authorization: userToken });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array').to.have.length(3);
      expect(res.body[0]).to.include.all.keys([
        'id',
        'totalPrice',
        'deliveryAddress',
        'deliveryNumber',
        'saleDate',
        'status',
        'userId',
        'sellerId',
      ]);
    });
  });

  describe('List a specific order using the id param', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDbResponse);
      sinon.stub(Sale, 'findOne').resolves(userOrderById);
    });

    after(() => {
      (User.findOne).restore();
      (Sale.findOne).restore();
    });

    it('Should return hhtp status 200 and an object', async () => {
      res = await chai.request(app).get('/customer/orders/1')
        .set({ authorization: userToken });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object').to.have.own.property('status');
    });
  });

  describe('Test role conflict case', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDbResponse);
      sinon.stub(Sale, 'findOne').resolves(userIdConflictOrder);
    });

    after(() => {
      (User.findOne).restore();
      (Sale.findOne).restore();
    });

    it('Should return http status 403', async () => {
      res = await chai.request(app).get('/customer/orders/1').set({ authorization: userToken });
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Access denied');
    });
  });
});

describe('Test GET /seller/orders endpoint', () => {
  let res;
  describe('List all orders from a seller', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(sellerDbResponse);
      sinon.stub(Sale, 'findAll').resolves(orders);
    });

    after(() => {
      (User.findOne).restore();
      (Sale.findAll).restore();
    });

    it('Should return http status 200 and an array', async () => {
      res = await chai.request(app).get('/seller/orders')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array').to.have.length(3);
      expect(res.body[0]).to.all.keys([
        'id',
        'totalPrice',
        'deliveryAddress',
        'deliveryNumber',
        'saleDate',
        'status',
        'userId',
        'sellerId',
      ]);
    });
  });

  describe('List a specific order using the id param', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(sellerDbResponse);
      sinon.stub(Sale, 'findOne').resolves(sellerOrderById);
    });
    after(() => {
      (User.findOne).restore();
      (Sale.findOne).restore();
    });

    it('Should return http status 200 and an object', async () => {
      res = await chai.request(app).get('/seller/orders/2')
        .set({ authorization: sellerToken });
      console.log(res.error);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object').to.have.own.property('status');
    });
  });

  describe('Token with role equal customer try to list all seller orders', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDbResponse);
      sinon.stub(Sale, 'findAll').resolves(orders);
    });

    after(() => {
      (User.findOne).restore();
      (Sale.findAll).restore();
    });

    it('Should return http status 403', async () => {
      res = await chai.request(app).get('/seller/orders').set({ authorization: sellerToken });
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Access denied');
    });
  });

  describe('Token with role equal customer try to list a specifc seller order', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDbResponse);
      sinon.stub(Sale, 'findAll').resolves(orders);
    });

    after(() => {
      (User.findOne).restore();
      (Sale.findAll).restore();
    });

    it('Should return http status 403', async () => {
      res = await chai.request(app).get('/seller/orders/2').set({ authorization: sellerToken });
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Access denied');
    });
  });
});

describe('Test PATCH order routes', () => {
  let res;
  describe('Test seller/orders/start/:id', () => {
    it('Send an invalid token', async () => {
      res = await chai.request(app).patch('/seller/orders/start/2');
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Invalid token');
    });
  });

  describe('Update status sale property at start route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(1); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 204', async () => {
      res = await chai.request(app).patch('/seller/orders/start/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(204);
    });
  });

  describe('Does not update status sale property at start route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(0); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 404', async () => {
      res = await chai.request(app).patch('/seller/orders/start/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Order not found');
    });
  });

  describe('Test database exception at start route', () => {
    before(async () => {
      sinon.stub(Sale, 'update').throws();
    });

    after(() => { (Sale.update).restore(); });

    it('Should return http status 500', async () => {
      res = await chai.request(app).patch('/seller/orders/start/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.own.property('message')
    });
  });

  describe('Update status sale property at /seller/orders/leave/:id route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(1); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 204', async () => {
      res = await chai.request(app).patch('/seller/orders/leave/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(204);
    });
  });

  describe('Does not update status sale property at leave route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(0); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 404', async () => {
      res = await chai.request(app).patch('/seller/orders/leave/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Order not found');
    });
  });

  describe('Test database exception at leave route', () => {
    before(async () => {
      sinon.stub(Sale, 'update').throws();
    });

    after(() => { (Sale.update).restore(); });

    it('Should return http status 500', async () => {
      res = await chai.request(app).patch('/seller/orders/leave/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.own.property('message')
    });
  });

  describe('Update status sale property at /seller/orders/delivered/:id route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(1); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 204', async () => {
      res = await chai.request(app).patch('/seller/orders/delivered/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(204);
    });
  });

  describe('Does not update status sale property at delivered route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(0); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 404', async () => {
      res = await chai.request(app).patch('/seller/orders/delivered/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Order not found');
    });
  });

  describe('Test database exception at delivered route', () => {
    before(async () => {
      sinon.stub(Sale, 'update').throws();
    });

    after(() => { (Sale.update).restore(); });

    it('Should return http status 500', async () => {
      res = await chai.request(app).patch('/seller/orders/delivered/2')
        .set({ authorization: sellerToken });
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.own.property('message')
    });
  });
});
