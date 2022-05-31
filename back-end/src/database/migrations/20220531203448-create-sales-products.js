'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
      sale_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, onUpdate: 'CASCADE', onDelete: 'CASCADE',
      references: { model: 'users', key: 'id', }, }, 
      product_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, onUpdate: 'CASCADE', onDelete: 'CASCADE', 
      references: { model: 'users', key: 'id', }, }, 
      quantity: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salesProducts');
  }
};