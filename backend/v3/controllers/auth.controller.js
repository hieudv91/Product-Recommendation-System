const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Model = require('../models/user.model');
const RoleModel = require('../models/role.model');
const { findByCredentials, createToken } = require('../utils/auth.util')
const { escapeRegex } = require('../utils/function.util')

const loginPre_find = async (req, h) => {
    try {
        const { username, password } = req.payload
        let user = await findByCredentials(username, password)
        if (user) {
            user._id = undefined
            user.password = undefined
            user.createdAt = undefined
            user.__v = undefined
        }
        return user
    } catch (err) {
        throw Boom.unauthorized(err)
    }
}
const loginPre_role = async function (req, h) {
    try {
        const roleId = req.pre.user?.role
        return await RoleModel.findById(roleId)
    } catch (err) {
        throw Boom.unauthorized(err)
    }
}
const loginPre_token = async (req, h) => {
    let user = req.pre.user
    if (user) {
        user.role = req.pre.role.name
    }
    return createToken(
        user,
        '730h'
    )
}
const loginPre = [
    { assign: 'user', method: loginPre_find },
    { assign: 'role', method: loginPre_role },
    { assign: 'standardToken', method: loginPre_token },
]
const login = async (req, h) => {
    let accessToken = ''
    let response = {}
    if (!req.pre.user) {
        throw Boom.unauthorized(
            'Username and password are incorrect. Please try again.'
        )
    }
    accessToken = req.pre.standardToken

    response = {
        accessToken,
    }

    return response
}

module.exports = {
    loginPre, login
};