const { Category } = require("../models/models");
const path = require("path");
const uuid = require("uuid");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const category = await Category.create({ name, img: fileName });

      return res.json(category);
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async getAll(req, res) {
    const { sequelize } = req.app.locals;
    const categories = await Category.findAll();
    res.json(categories);
  }

  async getOne(req, res) {
    const { sequelize } = req.app.locals;
    const id = req.params.id;
    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }
    return res.json(category);
  }
}

module.exports = new CategoryController();
