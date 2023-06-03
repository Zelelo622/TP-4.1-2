const { Category } = require("../models/models");
const path = require("path");
const uuid = require("uuid");
const ApiError = require("../error/ApiError");

class CategoryController {
  async getAll(req, res) {
    const categories = await Category.findAll();
    res.json(categories);
  }

  async getOne(req, res) {
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
