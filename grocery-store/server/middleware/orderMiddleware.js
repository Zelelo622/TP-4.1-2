const ApiError = require("../error/ApiError");

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
};

module.exports = orderMiddleware;
