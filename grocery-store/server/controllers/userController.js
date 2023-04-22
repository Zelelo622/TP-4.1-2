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
}

module.exports = new UserController();
