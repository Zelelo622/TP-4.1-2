const { check } = require("express-validator");

const registrationValidation = [
  check("first_name", "Имя пользователя не может быть пустым").notEmpty(),
  check("second_name", "Фамилия пользователя не может быть пустой").notEmpty(),
  check("phone", "Телефон пользователя не может быть пустым").notEmpty(),
  check("phone", "Некорректный номер телефона").isMobilePhone("ru-RU"),
  check("password", "Пароль должен быть больше 6 символов").isLength({
    min: 6,
  }),
  check("secret_word", "Секретное слово не может быть пустым").notEmpty(),
];

const resetPasswordValidation = [
  check("password", "Пароль должен быть больше 6 символов").isLength({
    min: 6,
  }),
];

module.exports = {
  registrationValidation,
  resetPasswordValidation
};
