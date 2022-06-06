const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { User } = require('../../database/models');
const app = require('../../api/app');
const { newValidUser, userWithoutName } = require('./mocks/register');
const { userDbResponse } = require('./mocks/loginMocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test Post /register endpoint', () => {
  let res;
  describe('User does not exist on database', () => {
    before(async () => sinon.stub(User, 'findOne').resolves(null));
    after(() => (User.findOne).restore());
    it('Should return http status 201', async () => {
      res = await chai.request(app).post('/register').send(newValidUser);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.an('object');
    });
  });

  describe('User exist on database', () => {
    before(async () => sinon.stub(User, 'findOne').resolves(userDbResponse));
    after(() => (User.findOne).restore());
    it('Should return http status 409 and an object with message property', async () => {
      res = await chai.request(app).post('/register').send(newValidUser);
      expect(res.status).to.be.equal(409);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('User already exists');
    });
  });

  describe('Send a request with missing information', () => {
    it('Should return http status 400 and a object with message property', async () => {
      res = await chai.request(app).post('/register').send(userWithoutName);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body)
        .to.have.own.property('message')
        .to.be.equal('Name must be filled');
    });
  });
});
