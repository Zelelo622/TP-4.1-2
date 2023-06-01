const sequelize = require("../db");
const User = require("./user");
const Product = require("./product");
const Orders = require("./orders");
const OrdersProduct = require("./ordersProduct");
const Category = require("./category");

module.exports = {
  User,
  Product,
  Orders,
  OrdersProduct,
  Category,
};
