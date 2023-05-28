const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Orders } = require("../models/models");
const { validationResult } = require("express-validator");

const generateJwt = (id, first_name, second_name, phone, role) => {
  return jwt.sign(
    { id, first_name, second_name, phone, role },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
      }
      const {
        first_name,
        second_name,
        phone,
        password,
        passwordConfirmation,
        secret_word,
        role,
      } = req.body;

      if (password !== passwordConfirmation) {
        return res.status(400).json({ password: "Пароли не совпадают" });
      }

      const candidate = await User.findOne({ where: { phone } });
      if (candidate) {
        return res
          .status(409)
          .json({ phone: "Пользователь с таким телефоном уже существует" });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const hashSecretWord = await bcrypt.hash(secret_word, 5);
      const user = await User.create({
        first_name,
        second_name,
        phone,
        password: hashPassword,
        secret_word: hashSecretWord,
        role,
      });
      const token = generateJwt(
        user.id,
        user.first_name,
        user.second_name,
        user.phone,
        user.role
      );
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req, res, next) {
    try {
      const { phone, password } = req.body;
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(404)
          .json({ phone: `Пользователь c телефоном ${phone} не найден` });
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ password: `Введен неверный пароль` });
      }
      const token = generateJwt(
        user.id,
        user.first_name,
        user.second_name,
        user.phone,
        user.role
      );
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка авторизации" });
    }
  }

  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.first_name,
      req.user.second_name,
      req.user.phone,
      req.user.role
    );
    return res.json({ token });
  }

  async verifyAccount(req, res) {
    const { phone, secret_word } = req.body;

    try {
      const user = await User.findOne({
        where: { phone },
      });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (!user.secret_word) {
        return res
          .status(400)
          .json({ message: "Секретное слово пользователя не определено" });
      }

      if (!secret_word) {
        return res.status(400).json({ message: "Секретное слово пустое" });
      }

      const validSecret = await bcrypt.compare(secret_word, user.secret_word);
      if (!validSecret) {
        return res.status(400).json({ message: "Неверное секретное слово" });
      }

      const token = jwt.sign({ phone }, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async resetPassword(req, res) {
    const { password, passwordConfirmation } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Токен отсутствует" });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ password: "Пароли не совпадают" });
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userPhone = decodedToken.phone;

      const hashedPassword = await bcrypt.hash(password, 5);
      await User.update(
        { password: hashedPassword },
        { where: { phone: userPhone } }
      );

      const newToken = jwt.sign({ phone: userPhone }, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });
      res.json({ message: "Пароль успешно изменен", token: newToken });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Неверный токен" });
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      const users = await User.findAll({
        where: {
          role: ["COURIER", "USER"],
        },
        order: [["role", "DESC"]],
        limit,
        offset,
      });

      const count = await User.count({
        where: {
          role: ["COURIER", "USER"],
        },
      });

      return res.json({ count, rows: users });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка запроса пользователей" });
    }
  }

  async getAllCourier(req, res, next) {
    try {
      const users = await User.findAll({
        where: {
          role: ["COURIER"],
        },
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка получения курьеров" });
    }
  }

  async getOne(req, res, next) {
    try {
      const { phone } = req.params;
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(404)
          .json({ message: `Пользователь c телефоном ${phone} не найден` });
      }
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка получения пользователя" });
    }
  }

  async update(req, res, next) {
    try {
      const { phone } = req.params;
      const { first_name, second_name, password, role } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;
      const userRole = decodedToken.role;

      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(404)
          .json({ message: `Пользователь c телефоном ${phone} не найден` });
      }

      if (userRole !== "ADMIN" && user.id !== userId) {
        return res.status(403).json({
          message: "Нет прав на изменение данных другого пользователя",
        });
      }

      const ordersWithCourier = await Orders.findOne({
        where: {
          courier_id: user.id,
        },
        attributes: ["id"],
      });

      if (ordersWithCourier) {
        return res.status(400).json({
          message: "Пользователь уже назначен в заказе, изменить роль нельзя",
        });
      }

      if (first_name) {
        user.first_name = first_name;
      }
      if (second_name) {
        user.second_name = second_name;
      }
      if (password) {
        const hashPassword = await bcrypt.hash(password, 5);
        user.password = hashPassword;
      }
      if (userRole === "ADMIN" && role) {
        user.role = role;
      }

      await user.save();
      const newToken = generateJwt(
        user.id,
        user.first_name,
        user.second_name,
        user.phone,
        user.role
      );
      return res.json({ token: newToken });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка обновления данных" });
    }
  }

  async delete(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;
      const phone = decodedToken.phone;
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      if (user.id !== userId) {
        return res
          .status(401)
          .json({ message: "У вас нет доступа для выполнения этой операции" });
      }
      await User.destroy({ where: { id: user.id } });
      return res
        .status(200)
        .json({ message: `Пользователь с ID ${user.id} был удален` });
    } catch (err) {
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

  async deleteUserForAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const phoneToken = decodedToken.phone;
      const { phone } = req.params;

      const user = await User.findOne({ where: { phone: phoneToken } });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (user.role !== "ADMIN") {
        return res
          .status(401)
          .json({ message: "У вас нет доступа для выполнения этой операции" });
      }

      await User.destroy({ where: { phone } });
      return res
        .status(200)
        .json({ message: `Пользователь с телефоном ${phone} был удален` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new UserController();
