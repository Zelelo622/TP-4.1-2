const { Product } = require("../models/models");
const { Op, Sequelize } = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const mime = require("mime");

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

      if (!req.files || !req.files.img) {
        return res
          .status(400)
          .json({ error: "Пожалуйста, выберите файл изображения." });
      }

      const { img } = req.files;

      const fileExtension = mime.getExtension(img.mimetype);
      if (fileExtension !== "jpg" && fileExtension !== "jpeg") {
        return res
          .status(400)
          .json({ error: "Пожалуйста, выберите файл формата JPG." });
      }

      const existingProduct = await Product.findOne({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("name")),
          Sequelize.fn("LOWER", name.trim())
        ),
      });

      if (existingProduct) {
        return res.status(400).json({ error: "Имя уже существует." });
      }

      if (
        !name ||
        !price ||
        !composition ||
        !protein ||
        !fat ||
        !carbohydrates ||
        !calories ||
        !weight ||
        !categoryId ||
        !img
      ) {
        return res
          .status(400)
          .json({ error: "Пожалуйста, заполните все обязательные поля." });
      }

      if (
        price < 0 ||
        protein < 0 ||
        fat < 0 ||
        carbohydrates < 0 ||
        calories < 0 ||
        weight < 0
      ) {
        return res.status(400).json({ error: "Введите положительное число." });
      }

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
    const { name } = req.params;
    const {
      newName,
      price,
      composition,
      protein,
      fat,
      carbohydrates,
      calories,
      weight,
      vegetarian,
    } = req.body;
    const imgFile = req.files && req.files.img;

    let productData = {};

    if (newName && newName.trim() !== name.trim()) {
      const trimmedNewName = newName.trim();
      const existingProduct = await Product.findOne({
        where: { name: trimmedNewName },
      });
      if (existingProduct) {
        return res.status(400).json({ error: "Имя уже существует." });
      }
    }

    if (imgFile) {
      const fileExtension = mime.getExtension(imgFile.mimetype);
      if (fileExtension !== "jpg" && fileExtension !== "jpeg") {
        return res.status(400).json({ error: "Выберите файл формата JPG." });
      }
    }

    if (
      !newName ||
      !price ||
      !composition ||
      !protein ||
      !fat ||
      !carbohydrates ||
      !calories ||
      !weight ||
      !vegetarian
    ) {
      return res
        .status(400)
        .json({ error: "Заполните все обязательные поля." });
    }

    if (
      price < 0 ||
      protein < 0 ||
      fat < 0 ||
      carbohydrates < 0 ||
      calories < 0 ||
      weight < 0
    ) {
      return res.status(400).json({ error: "Введите положительное число." });
    }

    productData = {
      name: newName,
      price,
      composition,
      protein,
      fat,
      carbohydrates,
      calories,
      weight,
      vegetarian,
    };

    const product = await Product.update(productData, {
      where: { name },
    });

    return res.json(product);
  }

  async delete(req, res) {
    const { name } = req.params;
    const product = Product.destroy({
      where: { name },
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
