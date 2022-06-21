const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { User } = require('../../database/models');
const app = require('../../api/app');
const sellersUsers = require('./mocks/sellersUsers');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test sellers users exclusive endpoint', () => {
  let res;
  before(async () => sinon.stub(User, 'findAll').resolves(sellersUsers));
  after(() => (User.findAll).restore());

  it('Should have http status 200 and return an array with sellers users', async () => {
    res = await chai.request(app).get('/seller');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array').to.have.length(2);
  });
});
