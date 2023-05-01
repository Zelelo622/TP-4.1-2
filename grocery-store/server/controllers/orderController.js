const { Orders, OrdersProduct, Product } = require("../models/models");
const addressValidator = require("../middleware/orderMiddleware")

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
        status: "pending",
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

      res.json({ success: true, order: order });
    } catch (error) {
        next(error);
      }
  }

  async getAll(req, res, next) {
    try {
      const orders = await Orders.findAll({ include: OrdersProduct });
      res.json({ success: true, orders: orders });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await Orders.findByPk(orderId, { include: OrdersProduct });
      if (!order) {
        res.status(404).json({ success: false, message: "Order not found" });
        return;
      }
      res.json({ success: true, order: order });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const orderId = req.params.id;
      const status = req.body.status;

      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ success: false, message: "Order not found" });
        return;
      }

      order.status = status;
      await order.save();

      res.json({ success: true, order: order });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ success: false, message: "Order not found" });
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
}

module.exports = new OrderController();
