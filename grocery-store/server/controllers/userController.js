const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
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
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { first_name, second_name, phone, password, secret_word, role } =
        req.body;

      const candidate = await User.findOne({ where: { phone } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким телефоном уже существует" });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        first_name,
        second_name,
        phone,
        password: hashPassword,
        secret_word,
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
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res, next) {
    try {
      const { phone, password } = req.body;
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь c телефоном ${phone} не найден` });
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
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
      res.status(400).json({ message: "Login error" });
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

  async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Get users error" });
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
      res.status(400).json({ message: "Get user error" });
    }
  }

  async update(req, res, next) {
    try {
      const { phone } = req.params;
      const { first_name, second_name, password } = req.body;

      // Получаем информацию о пользователе из JWT токена
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;

      // Получаем информацию о пользователе из базы данных
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(404)
          .json({ message: `Пользователь c телефоном ${phone} не найден` });
      }

      // Проверяем, что пользователь, пытающийся изменить данные, имеет право на это
      if (user.id !== userId) {
        return res.status(401).json({
          message: "Нет прав на изменение данных другого пользователя",
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
      res.status(400).json({ message: "Update user error" });
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
      console.log(err);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new UserController();
