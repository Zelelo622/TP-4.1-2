const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);

module.exports = router;