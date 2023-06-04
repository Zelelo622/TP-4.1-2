const ApiError = require("../error/ApiError");
const {
  Orders,
  OrdersProduct,
  Product,
  User,
  Category,
} = require("../models/models");
const jwt = require("jsonwebtoken");

class OrderController {
  async create(req, res, next) {
    try {
      const { userId, address } = req.body;
      const cartItems = req.body.cartItems;
      const totalPrice = req.body.totalPrice;
      const totalQuantity = req.body.totalQuantity;

      const order = await Orders.create({
        userId: userId,
        address: address,
        status: "В обработке",
        amount: totalPrice,
      });

      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const product = await Product.findByPk(cartItem.id);
        const orderProduct = await OrdersProduct.create({
          orderId: order.id,
          productId: product.id,
          quantity: cartItem.quantity,
          price: product.price,
        });
      }

      res.json({ order: order });
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      const orders = await Orders.findAll({
        include: OrdersProduct,
        order: [
          ["status", "ASC"],
          ["courier_id", "DESC"],
          ["createdAt", "ASC"],
        ],
        limit,
        offset,
      });

      const count = await Orders.count({});

      res.json({ count, rows: orders });
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { phone } = req.params;
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Отсутствует токен авторизации" });
      }

      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(404)
          .json({ message: `Пользователь c телефоном ${phone} не найден` });
      }

      if (user.id !== userId) {
        return res.status(401).json({
          message: "Нет прав на просмотр данных другого пользователя",
        });
      }

      const orders = await Orders.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
        include: OrdersProduct,
        limit,
        offset,
      });

      const count = await Orders.count({ where: { userId: user.id } });

      if (count === 0) {
        return res.status(404).json({ message: "Заказы не найдены" });
      }

      res.json({ count, rows: orders });
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async getOrdersByCourierId(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Отсутствует токен авторизации" });
      }

      const token = authorizationHeader.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;

      const courier = await User.findOne({
        where: { id: userId, role: "COURIER" },
      });

      if (!courier) {
        return res
          .status(401)
          .json({ message: "Нет прав на просмотр данных другого курьера" });
      }

      const orders = await Orders.findAll({
        where: { courier_id: userId },
        include: OrdersProduct,
        order: [
          ["status", "ASC"],
          ["createdAt", "ASC"],
        ],
        limit,
        offset,
      });

      const count = await Orders.count({ where: { courier_id: userId } });

      res.json({ count, rows: orders });
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async updateStatus(req, res, next) {
    try {
      const orderId = req.params.id;
      const status = req.body.status;

      const order = await Orders.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async updateCourier(req, res, next) {
    try {
      const orderId = req.params.id;
      const courierId = req.body.courierId;

      const order = await Orders.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
      }

      const courier = await User.findByPk(courierId);
      if (!courier && courierId !== null) {
        return res.status(404).json({ message: "Курьер не найден" });
      }

      order.courier_id = courierId;
      await order.save();

      res.json(order);
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await Orders.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
      }

      await OrdersProduct.destroy({
        where: {
          orderId: orderId,
        },
      });

      await order.destroy();

      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async getProductsByOrderId(req, res, next) {
    const { id } = req.params;

    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Отсутствует токен авторизации" });
      }

      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;
      const userRole = decodedToken.role;

      const order = await Orders.findByPk(id);

      if (!order) {
        if (req.orderNotFoundError) {
          return res.status(404).json({ message: req.orderNotFoundError });
        } else {
          return res.status(404).json({ message: "Заказ не найден" });
        }
      }

      if (
        userRole !== "ADMIN" &&
        userRole !== "COURIER" &&
        order.userId !== userId
      ) {
        return res.status(401).json({
          message: "Нет прав на получение информации другого пользователя",
        });
      }

      const orderProducts = await OrdersProduct.findAll({
        where: { orderId: id },
        attributes: ["quantity"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "img"],
          },
        ],
      });

      res.status(200).json(orderProducts);
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }
}

module.exports = new OrderController();
