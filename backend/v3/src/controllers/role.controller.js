const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Model = require('../models/role.model');
const { escapeRegex } = require('../utils/function.util')

const find = async (req, h) => {
    let { q, _sort, _order, _start, _end, id } = req.query
    let c = 0
    _order = 'DESC' ? '-' : ''
    q = q ? q : ''
    let lo
    const regex = new RegExp(escapeRegex(q), 'gi');
    try {
        if (id) {
            let li = typeof id == 'string' ? [id] : uniq = [...new Set(id)];
            lo = await Model.find().where('_id').in(li).exec();
        } else {
            c = (await Model.find({ rolename: regex, active: true })).length
            lo = await Model.find({ rolename: regex, active: true })
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
    let o = null
    const la = { ...req.payload }
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
    try {
        const { id } = req.params
        o = await Model.findById(id)
        if(!o.active){
            throw Boom.notFound()
        }
    } catch (err) {
        throw Boom.notFound()
    }
    return res.response(o)
}
const update = async (req, res) => {
    let o = null
    const { id } = req.params
    const attributes = { ...req.payload };
    try {
        o = await Model.findByIdAndUpdate(id, attributes, { new: true })
    } catch (err) {
        console.log(err)
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