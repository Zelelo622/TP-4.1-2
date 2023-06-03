const chai = require("chai");
const expect = chai.expect;
const sequelizeTest = require("../db");
const app = require("../index");
const request = require("supertest");
const Product = require("../models/product");
const Category = require("../models/category");
const fs = require("fs");
const path = require("path");

const imagePath = path.join(__dirname, "test_image.jpg");

describe("Product Controller", () => {
  let categoryId;

  before(async () => {
    try {
      await sequelizeTest.authenticate();
      await sequelizeTest.sync({ force: false });
    } catch (error) {
      console.error("Failed to authenticate to the database:", error);
    }
  });

  describe("getProductsByCategory, search", () => {
    beforeEach(async () => {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      const category = await Category.create({
        name: "Category 3",
        img: "image1.jpg",
      });

      categoryId = category.id;
      await Product.bulkCreate([
        {
          name: "Product 1",
          price: 10.0,
          composition: "Composition 1",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 100.0,
          weight: 150.0,
          vegetarian: true,
          img: "image2.jpg",
          categoryId: categoryId,
        },
        {
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
          categoryId: categoryId,
        },
        {
          name: "Product 3",
          price: 20.0,
          composition: "Composition 3",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 300.0,
          weight: 150.0,
          vegetarian: true,
          img: "image2.jpg",
          categoryId: categoryId,
        },
        {
          name: "Item 4",
          price: 20.0,
          composition: "Composition 3",
          protein: 8.0,
          fat: 4.5,
          carbohydrates: 12.0,
          calories: 300.0,
          weight: 150.0,
          vegetarian: true,
          img: "image2.jpg",
          categoryId: categoryId,
        },
      ]);
    });

    it("should retrieve products by category without filters", async () => {
      const response = await request(app).get(
        `/api/product?categoryId=${categoryId}`
      );
      expect(response.status).to.equal(200);
      expect(response.body.products.rows.length).to.equal(4);
      expect(response.body.products.count).to.equal(4);
      expect(response.body.minPrice).to.equal(10.0);
      expect(response.body.maxPrice).to.equal(20.0);
      expect(response.body.minCalories).to.equal(100.0);
      expect(response.body.maxCalories).to.equal(300.0);
    });

    it("should search products with filters", async () => {
      const response = await request(app)
        .get("/api/product/search?search=Prod")
        .timeout(50000);
      expect(response.status).to.equal(200);

      const responseData = response.body;

      expect(responseData.products.rows.length).to.equal(3);
      expect(responseData.products.count).to.equal(3);
      expect(responseData.minPrice).to.equal(10.0);
      expect(responseData.maxPrice).to.equal(20.0);
      expect(responseData.minCalories).to.equal(100.0);
      expect(responseData.maxCalories).to.equal(300.0);
    }).timeout(50000);
  });

  describe("getOne", () => {
    beforeEach(async () => {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      const category = await Category.create({
        name: "Category 4",
        img: "category1.jpg",
      });

      categoryId = category.id;

      await Product.bulkCreate([
        {
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
          categoryId: categoryId,
        },
        {
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
          categoryId: categoryId,
        },
      ]);
    });

    it("should retrieve a single product by name", async () => {
      const response = await request(app).get("/api/product/Product%201");
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal("Product 1");
    });

    it("should return 404 if product is not found", async () => {
      const response = await request(app).get(
        "/api/product/Nonexistent%20Product"
      );
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("Товар не найден");
    });
  });

  describe("delete", () => {
    beforeEach(async () => {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      const category = await Category.create({
        name: "Category 5",
        img: "category1.jpg",
      });

      categoryId = category.id;
      await Product.bulkCreate([
        {
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
          categoryId: categoryId,
        },
        {
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
          categoryId: categoryId,
        },
      ]);
    });

    it("should delete a product by name", async () => {
      const response = await request(app).delete("/api/product/Product%201");
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);

      const deletedProduct = await Product.findOne({
        where: { name: "Product 1" },
      });
      expect(deletedProduct).to.be.null;
    });
  });

  describe("create", () => {
    beforeEach(async () => {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      const category = await Category.create({
        name: "Category 6",
        img: "image1.jpg",
      });

      categoryId = category.id;
    });

    it("should create a new product", async () => {
      const response = await request(app)
        .post("/api/product")
        .attach("img", `${__dirname}/test-img.jpg`)
        .field("name", "New Product")
        .field("price", "10.0")
        .field("composition", "Composition 1")
        .field("protein", "8.0")
        .field("fat", "4.5")
        .field("carbohydrates", "12.0")
        .field("calories", "100.0")
        .field("weight", "150.0")
        .field("vegetarian", "true")
        .field("categoryId", categoryId);

      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal("New Product");
      expect(response.body.price).to.equal(10);
      expect(response.body.composition).to.equal("Composition 1");
      expect(response.body.protein).to.equal(8);
      expect(response.body.fat).to.equal(4.5); 
      expect(response.body.carbohydrates).to.equal(12.0);
      expect(response.body.calories).to.equal(100); 
      expect(response.body.weight).to.equal(150);
      expect(response.body.vegetarian).to.equal(true);
      expect(response.body.categoryId).to.equal(categoryId);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/product")
        .field("name", "New Product")
        .field("composition", "Composition 1")
        .field("protein", "8.0")
        .field("fat", "4.5")
        .field("carbohydrates", "12.0")
        .field("calories", "100.0")
        .field("weight", "150.0")
        .field("vegetarian", "true")
        .field("categoryId", categoryId);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(
        "Пожалуйста, выберите файл изображения."
      );
    });
  });
});
