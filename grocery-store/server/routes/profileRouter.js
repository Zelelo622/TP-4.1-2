const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.get("/:phone", userController.getOne);
router.put("/:phone", userController.update);
router.delete("/:phone", userController.delete);

module.exports = router;
