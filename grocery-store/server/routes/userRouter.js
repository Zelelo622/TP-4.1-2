const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registrationValidation,
  resetPasswordValidation,
} = require("../middleware/userMiddleware");

router.post(
  "/registration",
  registrationValidation,
  userController.registration
);

router.post("/login", userController.login);

router.post("/verify", userController.verifyAccount);

router.post(
  "/resetPassword",
  resetPasswordValidation,
  userController.resetPassword
);

router.get("/auth", authMiddleware, userController.check);

module.exports = router;
