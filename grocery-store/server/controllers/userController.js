const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, first_name, second_name, phone, role) => {
    return jwt.sign(
        {id, first_name, second_name, phone, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController {
    async registration(req, res, next) {
        const {first_name, second_name, phone, password, role} = req.body;
        if (!first_name || !second_name || !phone || !password) {
            //pass
        }
        const candidate = await User.findOne({where: {phone}});
        if (candidate) {
            //pass
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({first_name, second_name, phone, password: hashPassword, role});
        const token = generateJwt(user.id, user.first_name, user.second_name, user.phone, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {phone, password} = req.body;
        const user = await User.findOne({where: {phone}});
        if (!user) {
            //pass
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            //pass
        }
        const token = generateJwt(user.id, user.first_name, user.second_name, user.phone, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.first_name, req.user.second_name, req.user.phone, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();