const { Product } = require("../models/models");
const { Op } = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

class ProductController {
  async getProductsByCategory(req, res, next) {
    const categoryId = req.query.categoryId;
    let { priceRange, isVegetarian, calRange, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    const filter = {};

    if (priceRange) {
      const [priceMin, priceMax] = priceRange.split("-");
      filter.price = {
        [Op.between]: [priceMin, priceMax],
      };
    }

    if (isVegetarian === "true") {
      filter.vegetarian = true;
    } else if (isVegetarian === "false") {
      filter.vegetarian = false;
    }

    if (calRange) {
      const [calMin, calMax] = calRange.split("-");
      filter.calories = {
        [Op.between]: [calMin, calMax],
      };
    }

    try {
      const products = await Product.findAndCountAll({
        where: { categoryId, ...filter },
        limit,
        offset,
      });
      res.json(products);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const {
        name,
        price,
        composition,
        protein,
        fat,
        carbohydrates,
        calories,
        weight,
        vegetarian,
        categoryId,
      } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        composition,
        protein,
        fat,
        carbohydrates,
        calories,
        weight,
        vegetarian,
        img: fileName,
        categoryId,
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }

  async getOne(req, res) {
    const name = req.params.name;
    const product = await Product.findOne({
      where: { name },
    });
    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      price,
      composition,
      protein,
      fat,
      carbohydrates,
      calories,
      weight,
      vegetarian,
    } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const product = await Product.update(
      {
        name: name,
        price: price,
        composition: composition,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates,
        calories: calories,
        weight: weight,
        vegetarian,
        vegetarian,
        img: fileName,
      },
      {
        where: { id },
      }
    );
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = Product.destroy({
      where: { id },
    });
    return res.json(product);
  }

  async search(req, res, next) {
    try {
      let { name, priceRange, isVegetarian, calRange, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      name = name.replace(/\s+$/, "") + "%";

      const filter = {};

      if (priceRange) {
        const [priceMin, priceMax] = priceRange.split("-");
        filter.price = {
          [Op.between]: [priceMin, priceMax],
        };
      }

      if (isVegetarian === "true") {
        filter.vegetarian = true;
      } else if (isVegetarian === "false") {
        filter.vegetarian = false;
      }

      if (calRange) {
        const [calMin, calMax] = calRange.split("-");
        filter.calories = {
          [Op.between]: [calMin, calMax],
        };
      }

      const products = await Product.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: name,
          },
          ...filter,
        },
        limit,
        offset,
      });
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
