const { Product, Category } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, composition, protein, fat, carbohydrates, calories, weight, vegetarian, categoryId } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const product = await Product.create({ name, price, composition, protein, fat, carbohydrates, calories, weight, vegetarian, img: fileName, categoryId });

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
        const id = req.params.id;
        const product = await Product.findOne(
            {
                where: { id }
            }
        );
        return res.json(product);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, price, composition, protein, fat, carbohydrates, calories, weight, vegetarian } = req.body;
        const { img } = req.files;
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
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
                vegetarian, vegetarian,
                img: fileName
            },
            {
                where: { id }
            }
        );
        return res.json(product);
    }

    async delete(req, res) {
        const { id } = req.params;
        const product = Product.destroy(
            {
                where: { id }
            }
        );
        return res.json(product);
    }
}

module.exports = new ProductController()