const chai = require("chai");
const expect = chai.expect;
const sequelizeTest = require("../db");
const Category = require("../models/category");
const app = require("../index");
const request = require("supertest");
const Product = require("../models/product");

describe("Category Controller", () => {
  before(async () => {
    try {
      await sequelizeTest.authenticate();
      await sequelizeTest.sync({ force: false });
    } catch (error) {
      console.error("Failed to authenticate to the database:", error);
    }
  });

  describe("getAll", () => {
    beforeEach(async () => {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      await Category.bulkCreate([
        { name: "Category 1", img: "image1.jpg" },
        { name: "Category 2", img: "image2.jpg" },
      ]);
    });

    it("should return all categories", async () => {
      const response = await request(app).get("/api/category");
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(2);
    });
  });

  describe("getOne", () => {
    beforeEach(async () => {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      await Category.bulkCreate([
        { name: "Category 1", img: "image1.jpg" },
        { name: "Category 2", img: "image2.jpg" },
      ]);
    });

    it("should return a specific category by id", async () => {
      const categories = await Category.findAll();
      const categoryId = categories[0].id;

      const response = await request(app).get(`/api/category/${categoryId}`);
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(categoryId);
    });
  });
});
