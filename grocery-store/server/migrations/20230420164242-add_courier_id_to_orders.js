'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'courier_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      foreignKey: { name: 'fk_courier_id' }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'courier_id');
  }
};
