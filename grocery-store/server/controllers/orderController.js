const { Orders, OrdersProduct, Product } = require("../models/models");

class OrderController {
  // Создание заказа
  async create(req, res) {
    try {
      const { userId, address } = req.body;
      const cartItems = req.body.cartItems;
      const totalPrice = req.body.totalPrice;
      const totalQuantity = req.body.totalQuantity;

      // Создаем заказ
      const order = await Orders.create({
        userId: userId,
        address: address,
        status: "pending",
        amount: totalPrice,
      });

      // Создаем записи в таблице orders_products
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
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Получение списка всех заказов
  async getAll(req, res) {
    try {
      const orders = await Orders.findAll({ include: OrdersProduct });
      res.json({ success: true, orders: orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Получение информации о конкретном заказе
  async getOne(req, res) {
    try {
      const orderId = req.params.id;
      const order = await Orders.findByPk(orderId, { include: OrdersProduct });
      if (!order) {
        res.status(404).json({ success: false, message: "Order not found" });
        return;
      }
      res.json({ success: true, order: order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Обновление информации о конкретном заказе
  async update(req, res) {
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
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Удаление конкретного заказа
  async delete(req, res) {
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
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new OrderController();
