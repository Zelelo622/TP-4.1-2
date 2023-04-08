const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");

router.get("/:name", productController.getOne);
router.get("/", productController.getProductsByCategory);
router.delete("/:id", productController.delete);
router.put("/:id", productController.update);
router.post("/", productController.create);
// router.get('/', productController.getAll);

module.exports = router;
