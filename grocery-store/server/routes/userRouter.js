const Router = require('express');
const router = new Router();
const { check } = require("express-validator")
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', [
    check('first_name', "Имя пользователя не может быть пустым").notEmpty(),
    check('second_name', "Фамилия пользователя не может быть пустым").notEmpty(),
    check('phone', "Телефон пользователя не может быть пустым").notEmpty(),
    check('phone', "Некорректный номер телефона").matches(/^\+?\d{1,3}[- ]?\d{3,4}[- ]?\d{4}$/),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })
], userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;