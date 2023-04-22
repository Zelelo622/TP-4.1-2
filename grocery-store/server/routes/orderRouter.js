const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getOne);
router.delete("/:id", orderController.delete);
router.put("/:id", orderController.update);
router.post("/", orderController.create);

module.exports = router;
