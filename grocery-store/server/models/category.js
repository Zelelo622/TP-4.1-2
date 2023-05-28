const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const Product = require("./product");

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = Category;