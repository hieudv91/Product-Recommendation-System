const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Model = require('../models/shop.model');
const { escapeRegex } = require('../utils/function.util')

const find = async (req, h) => {
    let { q, _sort, _order, _start, _end, id } = req.query
    _order = 'DESC' ? '-' : ''
    q = q ? q : ''
    const regex = new RegExp(escapeRegex(q), 'gi');

    let filter = {}
    const { userid, scope } = req.auth.credentials
    if(scope == 'admin'){
        filter = { shopname: regex, owner: userid}
    }else{
        filter = { shopname: regex}
    }
    let count = 0
    let lstObj
    
    try {
        if (id) {
            let ids = typeof id == 'string' ? [id] : uniq = [...new Set(id)];
            lstObj = await Model.find().where('_id').in(ids).exec();
        } else {
            count = (await Model.find(filter)).length
            lstObj = await Model.find(filter)
                .skip(_start)
                .limit(_end - _start)
                .sort(`${_order}${_sort}`)
        }

    } catch (err) {
        console.log(err)
        throw Boom.notFound()
    }

    const response = h.response(lstObj);
    response.header('X-Total-Count', count);
    return response;
}
const create = async (req, res) => {
    const { userid, scope } = req.auth.credentials

    let crObj = null
    const attrs = { ...req.payload, owner: userid }
    try {
        const nObj = new Model(attrs);
        crObj = await nObj.save();
    } catch (err) {
        console.log(err)
        throw Boom.notAcceptable()
    }
    return res.response(crObj)
}
const findOne = async (req, res) => {
    let obj
    try {
        const { id } = req.params
        obj = await Model.findById(id)
    } catch (err) {
        throw Boom.notFound()
    }
    return res.response(obj)
}
const update = async (req, res) => {
    let uObj = null
    const { id } = req.params
    const attributes = { ...req.payload };
    let crObj = null
    try {
        uObj = await Model.findByIdAndUpdate(id, attributes, { new: true })
    } catch (err) {
        console.log(err)
        throw Boom.notAcceptable()
    }
    return res.response(uObj)
}
const deleteOne = async (req, res) => {
    let dObj = null
    const { id } = req.params
    try {
        dObj = await Model.findByIdAndDelete(id)
    } catch (err) {
        throw Boom.notAcceptable()
    }
    return res.response(dObj)

}

module.exports = {
    find,
    create,
    findOne,
    update,
    deleteOne,
};