const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Model = require('../models/shop.model');
const { escapeRegex } = require('../utils/function.util')

const find = async (req, h) => {
    let { q, _sort, _order, _start, _end, id } = req.query
    _order = 'DESC' ? '-' : ''
    q = q ? q : ''
    const regex = new RegExp(escapeRegex(q), 'gi');
    let f = {}, c = 0, lo
    const { userid } = req.auth.credentials
    f = { name: regex, owner: userid, active: true }

    try {
        if (id) {
            let ids = typeof id == 'string' ? [id] : uniq = [...new Set(id)];
            lo = await Model.find().where('_id').in(ids).exec();
        } else {
            c = (await Model.find(f)).length
            lo = await Model.find(f)
                .skip(_start)
                .limit(_end - _start)
                .sort(`${_order}${_sort}`)
        }

    } catch (err) {
        throw Boom.notFound()
    }

    const response = h.response(lo);
    response.header('X-Total-Count', c);
    return response;
}
const create = async (req, res) => {
    const { userid, username, scope } = req.auth.credentials

    let o = null
    const la = { ...req.payload, owner: userid, _xid: `${username}~${req.payload.code}` }
    try {
        const no = new Model(la);
        o = await no.save();
    } catch (err) {
        console.log(err)
        throw Boom.notAcceptable()
    }
    return res.response(o)
}
const findOne = async (req, res) => {
    let o
    try {
        const { id } = req.params
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

module.exports = {
    find, create, findOne, update, deleteOne,
};