const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  second_name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  passwordConfirmation: { type: DataTypes.VIRTUAL },
  secret_word: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

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

const OrdersProduct = sequelize.define("orders_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Orders);
Orders.belongsTo(User);

Orders.hasMany(OrdersProduct);
OrdersProduct.belongsTo(Orders);

Product.hasMany(OrdersProduct);
OrdersProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Product,
  Orders,
  OrdersProduct,
  Category,
};
