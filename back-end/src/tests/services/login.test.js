const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../database/models');
const { login } = require('../../services/login');

const email = 'test@test.com';
const password = '12345678';

describe('Testando service de usuários', () => {
  describe('Verifica chamada das funções', () => {
    before(async () => { sinon.spy(User, 'findOne'); });
    after(() => { User.findOne.restore(); });
    it('função de login é chamada com os argumentos corretos', async () => {
      await login(email, password);
      expect(User.findOne.called).to.be.true;
    });
  });
});
