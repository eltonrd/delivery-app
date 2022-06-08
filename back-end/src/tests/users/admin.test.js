const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { User } = require('../../database/models');
const app = require('../../api/app');
const { users, token, notAdminToken, newValidUser } = require('./mocks/adminMock');
const { userDbResponse } = require('./mocks/loginMocks');

chai.use(chaiHttp);
const { expect } = chai;
const ADMIN_ROUTE = '/admin/manage';

describe('Test GET /admin/manage endpoint', () => {
  let res;
  describe('Send request with an user that have role equal "administrator"', () => {
    before(async () => sinon.stub(User, 'findAll').resolves(users));
    after(() => (User.findAll).restore());
    it('Should return status 200 and an array with all users on database', async () => {
      res = await chai.request(app).get(ADMIN_ROUTE).set({ authorization: token });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array').to.have.length(5);
      expect(res.body).to.not.have.own.property('password');
    });
  });

  describe('Send request with an user that have role not equal "administrator"', () => {
    it('Should return http status 403 and an object with message property', async () => {
      res = await chai.request(app).get(ADMIN_ROUTE).set({ authorization: notAdminToken });
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Access denied');
    });
  });

  describe('Send request with an invalid token', () => {
    it('Should return http status 401 and an objetc with message property', async () => {
      res = await chai.request(app).get(ADMIN_ROUTE).set({ authorization: `!${token}!` });
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Invalid token');
    });
  });
});

describe('Test POST /admin/manage endpoint', () => {
  let res;
  describe('User does not exist on database', () => {
    before(async () => sinon.stub(User, 'findOne').resolves(null));
    after(() => (User.findOne).restore());
    it('Should return http status 201', async () => {
      res = await chai.request(app).post(ADMIN_ROUTE)
        .set({ authorization: token }).send(newValidUser);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('User created successfully');
    });
  });

  describe('User exist on database', () => {
    before(async () => sinon.stub(User, 'findOne').resolves(userDbResponse));
    after(() => (User.findOne).restore());
    it('Should return http status 409 and an object with message property', async () => {
      res = await chai.request(app).post(ADMIN_ROUTE)
        .set({ authorization: token }).send(newValidUser);
      expect(res.status).to.be.equal(409);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('User already exists');
    });
  });
});

describe('Test DELETE /admin/manage/id endpoint', () => {
  let res;
  describe('User exist on database', () => {
    before(async () => sinon.stub(User, 'destroy').resolves(userDbResponse));
    after(() => (User.destroy).restore());
    it('Should return http status 200 and an object with message property', async () => {
      res = await chai.request(app).delete(`${ADMIN_ROUTE}/3`)
        .set({ authorization: token });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('User deleted successfully');
    });
  });

  describe('User does not exist on database', () => {
    before(async () => sinon.stub(User, 'destroy').resolves(null));
    after(() => (User.destroy).restore());
    it('Should return http status 404 and an object with message property', async () => {
      res = await chai.request(app).delete(`${ADMIN_ROUTE}/3`)
        .set({ authorization: token });
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('User not found');
    });
  });
});
