const { Category } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class CategoryController {
    async getProductsByCategory(req, res, next) {
        const id = req.params.id;

        try {
            const category = await Category.findByPk(id, { include: [Product] });
            const products = category.products;

            res.json(products);
        } catch (error) {
            next(ApiError.badRequest(e.message));
        }
    }

    async create(req, res, next) {
        try {
            const { name } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const category = await Category.create({ name, img: fileName });

            return res.json(category);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const cateogrys = await Category.findAll();
        return res.json(cateogrys);
    }

    async getOne(req, res) {
        const id = req.params.id;
        const category = await Category.findOne(
            {
                where: {id}
            }
        );
        return res.json(category);
    }
}

module.exports = new CategoryController()