const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const orderMiddleware = require("../middleware/orderMiddleware");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getOne);
router.delete("/:id", orderController.delete);
router.put("/:id", orderController.update);
router.post("/",  orderMiddleware.addressValidator, orderMiddleware.orderValidator, orderController.create);

module.exports = router;
