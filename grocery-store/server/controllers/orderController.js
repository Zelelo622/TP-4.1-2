const {
  Orders,
  OrdersProduct,
  Product,
  User,
  Category,
} = require("../models/models");
const addressValidator = require("../middleware/orderMiddleware");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

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
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      const orders = await Orders.findAll({
        where: {
          status: "В обработке",
        },
        include: OrdersProduct,
        order: [
          ["courier_id", "DESC"],
          ["createdAt", "ASC"],
        ],
        limit,
        offset,
      });

      const count = await Orders.count({
        where: {
          status: "В обработке",
        },
      });

      res.json({ count, rows: orders });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { phone } = req.params;
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      const token = req.headers.authorization.split(" ")[1];
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
          message: "Нет прав на изменение данных другого пользователя",
        });
      }

      const orders = await Orders.findAll({
        where: { userId: user.id },
        include: OrdersProduct,
        limit,
        offset,
      });

      const count = await Orders.count({ where: { userId: user.id } });

      res.json({ count, rows: orders });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const orderId = req.params.id;
      const status = req.body.status;

      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ message: "Заказ не найден" });
        return;
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async updateCourier(req, res, next) {
    try {
      const orderId = req.params.id;
      const courierId = req.body.courierId;

      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ message: "Заказ не найден" });
        return;
      }

      const courier = await User.findByPk(courierId);
      if (!courier && courierId !== null) {
        res.status(404).json({ message: "Курьер не найден" });
        return;
      }

      order.courier_id = courierId;
      await order.save();

      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ message: "Заказ не найден" });
        return;
      }

      await OrdersProduct.destroy({
        where: {
          orderId: orderId,
        },
      });

      await order.destroy();

      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async getProductsByOrderId(req, res, next) {
    const { id } = req.params;

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;
      const userRole = decodedToken.role;

      const order = await Orders.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
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
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
