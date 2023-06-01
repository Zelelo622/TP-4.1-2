const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Orders = require("./orders");
const Product = require("./product");

const OrdersProduct = sequelize.define("orders_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

OrdersProduct.belongsTo(Orders);
Orders.hasMany(OrdersProduct);

OrdersProduct.belongsTo(Product);
Product.hasMany(OrdersProduct);

module.exports = OrdersProduct;
