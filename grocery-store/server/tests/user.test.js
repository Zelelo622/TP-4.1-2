const chai = require("chai");
const expect = chai.expect;
const sequelizeTest = require("../db");
const app = require("../index");
const request = require("supertest");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("User Controller", () => {
  before(async () => {
    try {
      await sequelizeTest.authenticate();
      await sequelizeTest.sync({ force: false });
    } catch (error) {
      console.error("Failed to authenticate to the database:", error);
    }
  });
  describe("Registration Controller", () => {
    beforeEach(async () => {
      await User.destroy({ where: {} });
    });

    it("should register a new user", async () => {
      const response = await request(app).post("/api/user/registration").send({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: "password123",
        passwordConfirmation: "password123",
        secret_word: "secret",
        role: "USER",
      });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");

      const user = await User.findOne({ where: { phone: "89046999565" } });
      expect(user).to.exist;
      expect(user.first_name).to.equal("Имя");
      expect(user.second_name).to.equal("Фамилия");
      expect(user.role).to.equal("USER");

      const isPasswordValid = await bcrypt.compare(
        "password123",
        user.password
      );
      expect(isPasswordValid).to.be.true;

      const isSecretWordValid = await bcrypt.compare(
        "secret",
        user.secret_word
      );
      expect(isSecretWordValid).to.be.true;
    });

    it("should return an error if password confirmation does not match", async () => {
      const response = await request(app).post("/api/user/registration").send({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: "password123",
        passwordConfirmation: "password456",
        secret_word: "secret",
        role: "USER",
      });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("password");
      expect(response.body.password).to.equal("Пароли не совпадают");

      const user = await User.findOne({ where: { phone: "89046999565" } });
      expect(user).to.not.exist;
    });

    it("should return an error if phone number is already registered", async () => {
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });

      const response = await request(app).post("/api/user/registration").send({
        first_name: "Jane",
        second_name: "Фамилия",
        phone: "89046999565",
        password: "password456",
        passwordConfirmation: "password456",
        secret_word: "secret",
        role: "USER",
      });

      expect(response.status).to.equal(409);
      expect(response.body).to.have.property("phone");
      expect(response.body.phone).to.equal(
        "Пользователь с таким телефоном уже существует"
      );

      const users = await User.findAll({ where: { phone: "89046999565" } });
      expect(users).to.have.lengthOf(1);
    });
  });

  describe("Login Controller", () => {
    beforeEach(async () => {
      await User.destroy({ where: { phone: "89046999565" } });
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
    });

    it("should log in an existing user with correct credentials", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({ phone: "89046999565", password: "password123" });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
    });

    it("should return 404 if user with given phone number does not exist", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({ phone: "89046999560", password: "test123" });

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("phone");
      expect(response.body.phone).to.equal(
        "Пользователь c телефоном 89046999560 не найден"
      );
    });

    it("should return 400 if password is incorrect", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({ phone: "89046999565", password: "wrongpassword" });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("password");
      expect(response.body.password).to.equal("Введен неверный пароль");
    });
  });

  describe("Verify Account Controller", () => {
    beforeEach(async () => {
      await User.destroy({ where: { phone: "89046999565" } });
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
    });

    it("should verify account with correct phone number and secret word", async () => {
      const response = await request(app)
        .post("/api/user/verify")
        .send({ phone: "89046999565", secret_word: "secret" });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");

      const decodedToken = jwt.verify(
        response.body.token,
        process.env.SECRET_KEY
      );
      expect(decodedToken).to.have.property("phone");
      expect(decodedToken.phone).to.equal("89046999565");
    });

    it("should return 404 if user with given phone number does not exist", async () => {
      const response = await request(app)
        .post("/api/user/verify")
        .send({ phone: "987654321", secret_word: "secret" });

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property(
        "message",
        "Пользователь не найден"
      );
    });

    it("should return 400 if secret word is empty", async () => {
      const response = await request(app)
        .post("/api/user/verify")
        .send({ phone: "89046999565", secret_word: "" });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "Секретное слово пустое"
      );
    });

    it("should return 400 if secret word is incorrect", async () => {
      const response = await request(app)
        .post("/api/user/verify")
        .send({ phone: "89046999565", secret_word: "wrongword" });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "Неверное секретное слово"
      );
    });

    function generateToken(phone) {
      const token = jwt.sign({ phone }, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });
      return token;
    }

    it("should reset password with valid token and matching passwords", async () => {
      const user = await User.findOne({ where: { phone: "89046999565" } });
      const token = generateToken(user.phone);

      const response = await request(app)
        .post("/api/user/resetPassword")
        .set("Authorization", `Bearer ${token}`)
        .send({
          password: "newPassword",
          passwordConfirmation: "newPassword",
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
      expect(response.body.message).to.equal("Пароль успешно изменен");

      const decodedToken = jwt.verify(
        response.body.token,
        process.env.SECRET_KEY
      );
      expect(decodedToken).to.have.property("phone");
      expect(decodedToken.phone).to.equal(user.phone);

      const updatedUser = await User.findOne({ where: { phone: user.phone } });
      const isPasswordMatch = await bcrypt.compare(
        "newPassword",
        updatedUser.password
      );
      expect(isPasswordMatch).to.be.true;
    });

    it("should return error if token is missing", async () => {
      const response = await request(app).post("/api/user/resetPassword").send({
        password: "newPassword",
        passwordConfirmation: "newPassword",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property("message", "Токен отсутствует");
    });

    it("should return error if passwords do not match", async () => {
      const token = generateToken("testPhone");

      const response = await request(app)
        .post("/api/user/resetPassword")
        .set("Authorization", `Bearer ${token}`)
        .send({
          password: "newPassword",
          passwordConfirmation: "wrongPassword",
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("password", "Пароли не совпадают");
    });
  });

  describe("getAll", () => {
    beforeEach(async () => {
      await User.destroy({ where: {} });
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
      await User.create({
        first_name: "Имя2",
        second_name: "Фамилия2",
        phone: "89046999561",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
    });
    it("should get all users with default limit and page", async () => {
      const response = await request(app).get("/api/profile");

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("count");
      expect(response.body).to.have.property("rows");
      expect(response.body.rows).to.be.an("array");
      expect(response.body.count).to.equal(2);
      expect(response.body.rows).to.have.lengthOf(2);
    });

    it("should get all users with custom limit and page", async () => {
      const limit = 1;
      const page = 1;

      const response = await request(app)
        .get("/api/profile")
        .query({ limit, page });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("count");
      expect(response.body).to.have.property("rows");
      expect(response.body.rows).to.be.an("array");
      expect(response.body.count).to.equal(2);
      expect(response.body.rows).to.have.lengthOf(1);
    });
  });

  describe("getAllCourier", () => {
    beforeEach(async () => {
      await User.destroy({ where: {} });
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "COURIER",
      });
      await User.create({
        first_name: "Имя2",
        second_name: "Фамилия2",
        phone: "89046999561",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "COURIER",
      });
      await User.create({
        first_name: "Имя3",
        second_name: "Фамилия3",
        phone: "89046999560",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
    });
    it("should get all courier", async () => {
      const response = await request(app).get("/api/profile/couriers");

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(2);
    });
  });

  describe("getOne", () => {
    beforeEach(async () => {
      await User.destroy({ where: {} });
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "COURIER",
      });
      await User.create({
        first_name: "Имя3",
        second_name: "Фамилия3",
        phone: "89046999560",
        password: await bcrypt.hash("password123", 5),
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
    });
    it("should get one user", async () => {
      const response = await request(app).get("/api/profile/89046999565");

      expect(response.status).to.equal(200);
      expect(response.body.first_name).to.equal("Имя");
      expect(response.body.second_name).to.equal("Фамилия");
      expect(response.body.phone).to.equal("89046999565");
    });

    it("should return 404 if user with given phone number does not exist", async () => {
      const response = await request(app).get("/api/profile/89046945569");

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property(
        "message",
        "Пользователь c телефоном 89046945569 не найден"
      );
    });
  });

  describe("deleteUserForAdmin", () => {
    const generateJwt = (id, first_name, second_name, phone, role) => {
      return jwt.sign(
        { id, first_name, second_name, phone, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
    };

    beforeEach(async () => {
      await User.destroy({ where: {} });
      await User.create({
        first_name: "Имя",
        second_name: "Фамилия",
        phone: "89046999565",
        password: "password123",
        secret_word: await bcrypt.hash("secret", 5),
        role: "ADMIN",
      });
      await User.create({
        first_name: "Имя2",
        second_name: "Фамилия2",
        phone: "89046999566",
        password: "password123",
        secret_word: await bcrypt.hash("secret", 5),
        role: "USER",
      });
    });

    afterEach(async () => {
      await User.destroy({ where: {} });
    });

    it("should delete user with valid token and matching user ID", async () => {
      const user = await User.findOne({ where: { phone: "89046999566" } });
      const token = generateJwt(
        user.id,
        user.first_name,
        user.second_name,
        user.phone,
        user.role
      );

      const response = await request(app)
        .delete(`/api/profile/${user.phone}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.be.true;

      const deletedUser = await User.findOne({ where: { phone: user.phone } });
      expect(deletedUser).to.be.null;
    });

    it("should return 404 if user with the given phone number doesn't exist", async () => {
      const token = generateJwt(
        1,
        "Admin",
        "Admin",
        "admin@example.com",
        "ADMIN"
      );

      const response = await request(app)
        .delete("/api/profile/1234567890")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal("Пользователь не найден");
    });
  });
});
