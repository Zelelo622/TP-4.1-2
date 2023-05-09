const ApiError = require("../error/ApiError");
const { Orders } = require("../models/models");

const orderMiddleware = {
  addressValidator(req, res, next) {
    if (!req.body.hasOwnProperty("address")) {
      return next(ApiError.badRequest("Адрес отсутствует в запросе"));
    }

    const address = req.body.address;
    const addressRegex = /^[a-zA-Zа-яА-Я0-9\s,'-]*$/;
    if (!address.trim()) {
      return next(ApiError.badRequest("Пустой адрес"));
    }
    if (!addressRegex.test(address)) {
      return next(ApiError.badRequest("Неверный формат адреса"));
    }

    next();
  },

  orderValidator(req, res, next) {
    const cartItems = req.body.cartItems;
    const totalPrice = req.body.totalPrice;
    if (!cartItems || cartItems.length === 0) {
      return next(ApiError.badRequest("Корзина пуста"));
    }

    if (!totalPrice || isNaN(totalPrice)) {
      return next(ApiError.badRequest("Неверная общая стоимость заказа"));
    }

    next();
  },

  async checkOrderExists(req, res, next) {
    const { id } = req.params;
    const order = await Orders.findByPk(id);
    if (!order) {
      return next(ApiError.badRequest(`Заказ с id ${id} не найден`));
    }
    next();
  },
};

module.exports = orderMiddleware;
