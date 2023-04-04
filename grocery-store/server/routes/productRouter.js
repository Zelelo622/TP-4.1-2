const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

router.post('/', productController.create);
// router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.delete('/:id', productController.delete);
router.put('/:id', productController.update);
router.get('/', productController.getProductsByCategory);

module.exports = router;