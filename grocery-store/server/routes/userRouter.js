const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/registration",
  [
    check("first_name", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "second_name",
      "Фамилия пользователя не может быть пустой"
    ).notEmpty(),
    check("phone", "Телефон пользователя не может быть пустым").notEmpty(),
    check("phone", "Некорректный номер телефона").isMobilePhone("ru-RU"),
    check("password", "Пароль должен быть больше 6 символов").isLength({
      min: 6,
    }),
    check("secret_word", "Секретное слово не может быть пустым").notEmpty(),
  ],
  userController.registration
);
router.post("/login", userController.login);
router.post("/verify", userController.verifyAccount);
router.post(
  "/resetPassword",
  [
    check("password", "Пароль должен быть больше 6 символов").isLength({
      min: 6,
    }),
  ],
  userController.resetPassword
);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
