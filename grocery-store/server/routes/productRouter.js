const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");

router.get("/search", productController.search);
router.get("/:name", productController.getOne);
router.get("/", productController.getProductsByCategory);
router.delete("/:name", productController.delete);
router.put("/:name", productController.update);
router.post("/", productController.create);

module.exports = router;
