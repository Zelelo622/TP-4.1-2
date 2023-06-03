const chai = require("chai");
const expect = chai.expect;
const sequelizeTest = require("../db");
const app = require("../index");
const request = require("supertest");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Orders = require("../models/orders");
const Product = require("../models/product");
const OrdersProduct = require("../models/ordersProduct");
const sinon = require("sinon");
const Category = require("../models/category");

describe("Order Controller", () => {
  before(async () => {
    try {
      await sequelizeTest.authenticate();
      await sequelizeTest.sync({ force: false });
    } catch (error) {
      console.error("Failed to authenticate to the database:", error);
    }
  });

  describe("create", () => {
    beforeEach(async () => {
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
    });

    afterEach(async () => {
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
    });

    it("should create a new order with order products", async () => {
      const userId = 1;
      const address = "123 Main St";
      const cartItems = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
      ];
      const totalPrice = 100;
      const totalQuantity = 5;

      const createOrderStub = sinon.stub(Orders, "create").resolves({ id: 1 });

      const findByPkStub = sinon.stub(Product, "findByPk");
      findByPkStub.withArgs(1).resolves({ id: 1, price: 50 });
      findByPkStub.withArgs(2).resolves({ id: 2, price: 25 });

      const createOrderProductStub = sinon
        .stub(OrdersProduct, "create")
        .resolves({});

      const response = await request(app)
        .post("/api/order")
        .send({ userId, address, cartItems, totalPrice, totalQuantity });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("order").that.is.an("object");

      expect(createOrderStub.calledOnce).to.be.true;
      expect(findByPkStub.callCount).to.equal(2);
      expect(createOrderProductStub.callCount).to.equal(2);

      createOrderStub.restore();
      findByPkStub.restore();
      createOrderProductStub.restore();
    });
  });

  describe("getAll", () => {
    beforeEach(async () => {
      await Orders.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await User.destroy({ where: {} });

      const user = await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
      await Orders.create({
        address: "Address 1",
        status: "Status 1",
        amount: 10.99,
        userId: user.id,
        courier_id: null,
      });
      await Orders.create({
        address: "Address 2",
        status: "Status 2",
        amount: 20.99,
        userId: user.id,
        courier_id: null,
      });
    });

    afterEach(async () => {
      await Orders.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      // await User.destroy({ where: {} });
    });

    it("should return paginated list of orders with default limit and page", async () => {
      const limit = 9;
      const page = 1;

      const findAllStub = sinon.stub(Orders, "findAll").resolves([]);
      const countStub = sinon.stub(Orders, "count").resolves(0);

      const response = await request(app)
        .get("/api/order")
        .query({ limit, page });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("rows").that.is.an("array");
      expect(countStub.calledOnce).to.be.true;

      findAllStub.restore();
      countStub.restore();
    });

    it("should return paginated list of orders with custom limit and page", async () => {
      const limit = 1;
      const page = 1;

      const findAllStub = sinon.stub(Orders, "findAll").resolves([]);
      const countStub = sinon.stub(Orders, "count").resolves(10);

      const response = await request(app)
        .get("/api/order")
        .query({ limit, page });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("rows").that.is.an("array");
      expect(countStub.calledOnce).to.be.true;

      findAllStub.restore();
      countStub.restore();
    });
  });

  describe("getOne", () => {
    beforeEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });

      await Category.bulkCreate([
        { id: 1, name: "Category 1", img: "image1.jpg" },
        { id: 2, name: "Category 2", img: "image2.jpg" },
      ]);

      await Product.bulkCreate([
        {
          id: 1564,
          name: "Product 1",
          price: 10.0,
          composition: "Composition 1",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 100.0,
          weight: 150.0,
          vegetarian: true,
          img: "image1.jpg",
          categoryId: 1,
        },
        {
          id: 1565,
          name: "Product 2",
          price: 15.0,
          composition: "Composition 2",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 200.0,
          weight: 150.0,
          vegetarian: false,
          img: "image2.jpg",
          categoryId: 2,
        },
      ]);

      await User.create({
        id: 1,
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999564",
        password: await bcrypt.hash("password", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });

      await Orders.create({
        id: 1,
        address: "Address 1",
        status: "Status 1",
        amount: 10.99,
        userId: 1,
        courier_id: null,
      });

      await Orders.create({
        id: 2,
        address: "Address 2",
        status: "Status 2",
        amount: 20.99,
        userId: 1,
        courier_id: null,
      });

      await OrdersProduct.create({
        id: 1,
        orderId: 1,
        productId: 1564,
        quantity: 2,
        price: 5.99,
      });

      await OrdersProduct.create({
        id: 2,
        orderId: 1,
        productId: 1565,
        quantity: 3,
        price: 4.99,
      });
    });

    afterEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it("should return orders for the authenticated user", async () => {
      const limit = 9;
      const page = 1;
      const phone = "89046999564";

      const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY);

      const response = await request(app)
        .get(`/api/order/${phone}`)
        .query({ limit, page })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("count", 2);
      expect(response.body).to.have.property("rows").that.is.an("array");
    });

    it("should return 404 if user is not found", async () => {
      const limit = 9;
      const page = 1;
      const phone = "987654321";

      const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY);

      const response = await request(app)
        .get(`/api/order/${phone}`)
        .query({ limit, page })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property(
        "message",
        `Пользователь c телефоном ${phone} не найден`
      );
    });

    it("should return 401 if user is not authorized to access the orders", async () => {
      const limit = 9;
      const page = 1;
      const phone = "89046999564";

      const token = jwt.sign({ id: 2 }, process.env.SECRET_KEY);

      const response = await request(app)
        .get(`/api/order/${phone}`)
        .query({ limit, page })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property(
        "message",
        "Нет прав на изменение данных другого пользователя"
      );
    });
  });

  describe("getOrdersByCourierId", () => {
    beforeEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });

      await Category.bulkCreate([
        { id: 1, name: "Category 1", img: "image1.jpg" },
        { id: 2, name: "Category 2", img: "image2.jpg" },
      ]);

      await Product.bulkCreate([
        {
          id: 1564,
          name: "Product 1",
          price: 10.0,
          composition: "Composition 1",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 100.0,
          weight: 150.0,
          vegetarian: true,
          img: "image1.jpg",
          categoryId: 1,
        },
        {
          id: 1565,
          name: "Product 2",
          price: 15.0,
          composition: "Composition 2",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 200.0,
          weight: 150.0,
          vegetarian: false,
          img: "image2.jpg",
          categoryId: 2,
        },
      ]);

      await User.create({
        id: 1,
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999564",
        password: await bcrypt.hash("password", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "COURIER",
      });

      await Orders.create({
        id: 1,
        address: "Address 1",
        status: "Status 1",
        amount: 10.99,
        userId: 1,
        courier_id: 1,
      });

      await Orders.create({
        id: 2,
        address: "Address 2",
        status: "Status 2",
        amount: 20.99,
        userId: 1,
        courier_id: 1,
      });

      await OrdersProduct.create({
        id: 1,
        orderId: 1,
        productId: 1564,
        quantity: 2,
        price: 5.99,
      });

      await OrdersProduct.create({
        id: 2,
        orderId: 1,
        productId: 1565,
        quantity: 3,
        price: 4.99,
      });
    });

    afterEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it("should return orders for the authenticated courier", async () => {
      const limit = 9;
      const page = 1;

      const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY);

      const response = await request(app)
        .get("/api/order/courier-order")
        .query({ limit, page })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("count", 2);
      expect(response.body).to.have.property("rows").that.is.an("array");
    });

    it("should return 401 if user is not authorized as a courier", async () => {
      const limit = 9;
      const page = 1;

      const token = jwt.sign({ id: 2 }, process.env.SECRET_KEY);

      const response = await request(app)
        .get("/api/order/courier-order")
        .query({ limit, page })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property(
        "message",
        "Нет прав на просмотр данных другого курьера"
      );
    });
  });

  describe("updateCourier", () => {
    beforeEach(async () => {
      await Orders.destroy({ where: {} });
      await User.destroy({ where: {} });

      await User.create({
        id: 1,
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999564",
        password: await bcrypt.hash("password", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "COURIER",
      });

      await Orders.create({
        id: 1,
        address: "Address 1",
        status: "Status 1",
        amount: 10.99,
        userId: 1,
        courier_id: 1,
      });
    });

    afterEach(async () => {
      await Orders.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it("should update the courier for the order", async () => {
      const orderId = 1;
      const courierId = 1;

      const response = await request(app)
        .put(`/api/order/${orderId}/courier`)
        .send({ courierId });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("courier_id", courierId);

      const order = await Orders.findByPk(orderId);
      expect(order.courier_id).to.equal(courierId);
    });

    it("should return 404 if the order is not found", async () => {
      const orderId = 2;
      const courierId = 1;

      const response = await request(app)
        .put(`/api/order/${orderId}/courier`)
        .send({ courierId });

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("message", "Заказ не найден");
    });

    it("should return 404 if the courier is not found", async () => {
      const orderId = 1;
      const courierId = 2;

      const response = await request(app)
        .put(`/api/order/${orderId}/courier`)
        .send({ courierId });

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("message", "Курьер не найден");
    });
  });

  describe("delete", () => {
    beforeEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });

      await Category.bulkCreate([
        { id: 1, name: "Category 1", img: "image1.jpg" },
        { id: 2, name: "Category 2", img: "image2.jpg" },
      ]);

      await Product.bulkCreate([
        {
          id: 1564,
          name: "Product 1",
          price: 10.0,
          composition: "Composition 1",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 100.0,
          weight: 150.0,
          vegetarian: true,
          img: "image1.jpg",
          categoryId: 1,
        },
      ]);

      await User.create({
        id: 1,
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999564",
        password: await bcrypt.hash("password", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });

      await Orders.create({
        id: 1,
        address: "Address 1",
        status: "Status 1",
        amount: 10.99,
        userId: 1,
        courier_id: null,
      });

      await OrdersProduct.create({
        id: 1,
        orderId: 1,
        productId: 1564,
        quantity: 2,
        price: 5.99,
      });
    });

    afterEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it("should delete the order and associated products", async () => {
      const orderId = 1;

      const response = await request(app).delete(`/api/order/${orderId}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success", true);

      const order = await Orders.findByPk(orderId);
      expect(order).to.be.null;

      const orderProduct = await OrdersProduct.findOne({ where: { orderId } });
      expect(orderProduct).to.be.null;
    });

    it("should return 404 if the order is not found", async () => {
      const orderId = 2;

      const response = await request(app).delete(`/api/order/${orderId}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("message", "Заказ не найден");
    });
  });

  describe("getProductsByOrderId", () => {
    beforeEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });

      await Category.bulkCreate([
        { id: 1, name: "Category 1", img: "image1.jpg" },
        { id: 2, name: "Category 2", img: "image2.jpg" },
      ]);

      await Product.bulkCreate([
        {
          id: 1564,
          name: "Product 1",
          price: 10.0,
          composition: "Composition 1",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 100.0,
          weight: 150.0,
          vegetarian: true,
          img: "image1.jpg",
          categoryId: 1,
        },
      ]);

      await User.create({
        id: 1,
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999564",
        password: await bcrypt.hash("password", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });

      await Orders.create({
        id: 1,
        address: "Address 1",
        status: "Status 1",
        amount: 10.99,
        userId: 1,
        courier_id: null,
      });

      await OrdersProduct.create({
        id: 1,
        orderId: 1,
        productId: 1564,
        quantity: 2,
        price: 5.99,
      });
    });

    afterEach(async () => {
      await Category.destroy({ where: {} });
      await OrdersProduct.destroy({ where: {} });
      await Orders.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it("should return the products for the authorized user", async () => {
      const orderId = 1;
      const token = jwt.sign({ id: 1, role: "USER" }, process.env.SECRET_KEY);

      const response = await request(app)
        .get(`/api/order/${orderId}/products`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.have.property("quantity", 2);
      expect(response.body[0]).to.have.property("product");
    });

    it("should return 404 if the order is not found", async () => {
      const orderId = 2;
      const token = jwt.sign({ id: 1, role: "USER" }, process.env.SECRET_KEY);

      const response = await request(app)
        .get(`/api/order/${orderId}/products`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("message", "Заказ не найден");
    });

    it("should return 401 if the user is not authorized to access the order", async () => {
      const orderId = 1;
      const token = jwt.sign({ id: 2, role: "USER" }, process.env.SECRET_KEY);

      const response = await request(app)
        .get(`/api/order/${orderId}/products`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property(
        "message",
        "Нет прав на получение информации другого пользователя"
      );
    });
  });
});
