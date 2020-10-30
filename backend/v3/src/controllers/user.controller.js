const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Model = require('../models/user.model');
const RM = require('../models/role.model');
const { escapeRegex, generateHash } = require('../utils/function.util')

const find = async (req, h) => {
    const { userid } = req.auth.credentials
    let { q, _sort, _order, _start, _end } = req.query
    let c = 0
    _order = 'DESC' ? '-' : ''
    q = q ? q : ''
    let lo
    const regex = new RegExp(escapeRegex(q), 'gi');
    try {
        c = (await Model.find({ fullname: regex, active: true })).length
        lo = await Model.find({ fullname: regex, active: true })
            .skip(_start)
            .limit(_end - _start)
            .sort(`${_order}${_sort}`)


    } catch (err) {
        throw Boom.notFound()
    }
    lo = lo.filter(o => o.id != userid)
    const response = h.response(lo);
    response.header('X-Total-Count', c - 1);
    return response;
}
const create = async (req, res) => {
    let o = null
    let la = { ...req.payload }
    la.password = await generateHash(la.password)
    try {
        const no = new Model(la);
        o = await no.save();
    } catch (err) {
        throw Boom.notAcceptable()
    }
    return res.response(o)
}
const findOne = async (req, res) => {
    let o
    const { id } = req.params
    try {
        o = await Model.findById(id)
    } catch (err) {
        throw Boom.notFound()
    }
    return res.response(o)

}
const update = async (req, res) => {
    let o = null
    const { id } = req.params
    const la = { ...req.payload };
    delete la.password
    try {
        o = await Model.findByIdAndUpdate(id, la, { new: true })
    } catch (err) {
        throw Boom.notAcceptable()
    }
    return res.response(o)
}
const deleteOne = async (req, res) => {
    let o = null
    const { id } = req.params
    try {
        o = await Model.findByIdAndUpdate(id, { active: false }, { new: true })
    } catch (err) {
        throw Boom.notAcceptable()
    }
    return res.response(o)

}

const profile = async (req, res) => {
    let o, role
    const { userid } = req.auth.credentials
    try {
        o = await Model.findById(userid)
        if (o) {
            role = await RM.findById(o.role)
            o.role = role.rolename
        }
    } catch (err) {
        throw Boom.notFound()
    }
    return res.response({ name: o.username, role: role.rolename })
}

module.exports = {
    find, create, findOne, update, deleteOne, profile
};