'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders_products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.removeColumn('orders_products', 'price');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders_products', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.removeColumn('orders_products', 'quantity');
  }
};
