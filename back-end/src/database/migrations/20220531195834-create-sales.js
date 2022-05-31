'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.DECIMAL
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      delivery_number: {
        type: Sequelize.STRING
      },
      sale_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      user_id: { type: Sequelize.INTEGER, allowNull: false, onUpdate: 'CASCADE', onDelete: 'CASCADE', 
      references: { model: 'users', key: 'id', }, }, 
      seller_id: { type: Sequelize.INTEGER, allowNull: false, onUpdate: 'CASCADE', onDelete: 'CASCADE', 
      references: { model: 'users', key: 'id', }, }, 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};