const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { User } = require('../../database/models');
const app = require('../../api/app');
const {
  validUser,
  userDbResponse,
  inValidUser,
  userWithoutEmail,
  userWithoutPassword,
} = require('./mocks/loginMocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test POST /login endpoint', () => {
  let res;
  describe('User exist on batabase', () => {
    before(async () => { sinon.stub(User, 'findOne').resolves(userDbResponse) });
    after(() => (User.findOne).restore());
    it('Should return http status 200 and an object with token property', async () => {
    res = await chai.request(app).post('/login').send(validUser);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.own.property('user');
      expect(res.body).to.have.own.property('token');
    });
  });

  describe('User exist on database and request send wrong information', () => {
    before(async () => { sinon.stub(User, 'findOne').resolves(userDbResponse) });
    after(() => (User.findOne).restore());
    it('Should return http status 400 and an object with message property', async () => {
      res = await chai.request(app).post('/login').send(inValidUser);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.own.property('message').to.be.equal('Incorrect email or password');
    });
  });

  describe('User does not exist on database', () => {
    before(async () => { sinon.stub(User, 'findOne').resolves(null) });
    after(() => (User.findOne).restore());
    it('Should return http status 404 and an object with message property', async () => {
      res = await chai.request(app).post('/login').send(validUser);
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.own.property('message').to.be.equal('User does not exist');
    });
  });

  describe('Send request without information', () => {
    it('Should have http status 400', async () => {
      res = await chai.request(app).post('/login').send(userWithoutEmail);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.own.property('message').to.be.equal('Email must be filled');
    });
  });

  describe('Send request without information', () => {
    it('Should have http status 400', async () => {
      res = await chai.request(app).post('/login').send(userWithoutPassword);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.own.property('message').to.be.equal('Password must be filled');
    });
  });
});
