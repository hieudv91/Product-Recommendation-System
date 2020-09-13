const Boom = require('@hapi/boom')
const Bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')
const Model = require('../models/user.model');

const findByCredentials = async (username, password) => {
    try {
        let user = await Model.findOne({ username })

        if (!user) {
            return false
        }
        const source = user.password

        let passwordMatch = await Bcrypt.compare(password, source)
        if (passwordMatch) {
            return user
        } else {
            return false
        }
    } catch (err) {
        throw Boom.badRequest(err)
    }
}
const createToken = (user, expirationPeriod) => {
    try {
        let token = {}
        const tokenUser = user
        token = Jwt.sign(
            {
                user: tokenUser
            },
            'jwtSecret',
            { algorithm: 'HS256', expiresIn: expirationPeriod }
        )
        return token
    } catch (err) {
        throw Boom.unauthorized(err)
    }
}

module.exports = { findByCredentials, createToken }