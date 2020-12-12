const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errrorHandler')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                massage: "Пароли не совпадают. Попробуйте снова."
            })
        }
    } else {
        res.status(404).json({
            massage: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            massage: 'Такой email уже занят. Попробуйте другой'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }

}