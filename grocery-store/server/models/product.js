const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT(10, 2), allowNull: false },
  composition: { type: DataTypes.TEXT, defaultValue: "", allowNull: false },
  protein: { type: DataTypes.FLOAT(5, 2), allowNull: false },
  fat: { type: DataTypes.FLOAT(5, 2), allowNull: false },
  carbohydrates: { type: DataTypes.FLOAT(5, 2), allowNull: false },
  calories: { type: DataTypes.FLOAT(5, 2), allowNull: false },
  weight: { type: DataTypes.FLOAT(5, 2), allowNull: false },
  vegetarian: { type: DataTypes.BOOLEAN, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Product;
