const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../database/models');
const { validUser } = require('./mocks/userMock');

describe('Testa o model de usuários', () => {
  describe('Usuário existe no banco de dados', () => {
    before(async () => { sinon.stub(User, 'findOne').resolves(validUser); });
    after(() => { User.findOne.restore(); });
    it('Retorna informações do usuário corretamente', async () => {
      const user = await User.findOne({ where: { email: validUser.email } });
      expect(user).to.be.an('object');
      expect(user).to.have.own.property('id').to.be.equal(1);
      expect(user).to.have.own.property('name').to.be.equal('Delivery App Admin');
      expect(user).to.have.own.property('email').to.be.equal('adm@deliveryapp.com');
      expect(user).to.have.own.property('password').to.have.length.greaterThanOrEqual(6);
      expect(user).to.have.own.property('role').to.be.equal('administrator');
    });
  });

  describe('Usuário não existe no banco de dados', () => {
    before(async () => { sinon.stub(User, 'findOne').resolves(null); });
    after(() => { User.findOne.restore(); });
    it('Retorna nulo quando não encontra nenhum email no banco de dados', async () => {
      const user = await User.findOne({ where: { email: 'test@test.com' } });
      expect(user).to.be.null;
    });
  });
});
