const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const orderMiddleware = require("../middleware/orderMiddleware");

router.get("/", orderController.getAll);
router.get("/courier-order", orderController.getOrdersByCourierId);
router.get(
  "/:id/products",
  orderController.getProductsByOrderId
);
router.get("/:phone", orderController.getOne);
router.delete("/:id", orderController.delete);
router.put("/:id", orderController.updateStatus);
router.put("/:id/courier", orderController.updateCourier);
router.post(
  "/",
  orderMiddleware.addressValidator,
  orderController.create
);

module.exports = router;
