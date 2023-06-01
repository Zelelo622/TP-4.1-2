const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Orders = sequelize.define("orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT(10, 2), allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  courier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "SET NULL",
    foreignKey: { name: "fk_courier_id" },
  },
});

Orders.belongsTo(User);
User.hasMany(Orders);

module.exports = Orders;
