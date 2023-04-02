const { Category } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class CategoryController {
    async create(req, res) {
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
}

module.exports = new CategoryController()