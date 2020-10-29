const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Model = require('../models/user.model');
const RM = require('../models/role.model');
const { escapeRegex, generateHash } = require('../utils/function.util')

const find = async (req, h) => {
    const { userid } = req.auth.credentials
    let { q, _sort, _order, _start, _end } = req.query
    let count = 0
    _order = 'DESC' ? '-' : ''
    q = q ? q : ''
    let lstObj
    const regex = new RegExp(escapeRegex(q), 'gi');
    try {
        count = (await Model.find({ fullname: regex })).length
        lstObj = await Model.find({ fullname: regex })
            .skip(_start)
            .limit(_end - _start)
            .sort(`${_order}${_sort}`)


    } catch (err) {
        throw Boom.notFound()
    }
    lstObj = lstObj.filter(o => o.id != userid)
                    .filter(o => o.username != 'sysadm')
    const response = h.response(lstObj);
    response.header('X-Total-Count', count);
    return response;
}
const create = async (req, res) => {
    let crObj = null
    let attrs = { ...req.payload }
    attrs.password = await generateHash(attrs.password)
    try {
        const nObj = new Model(attrs);
        crObj = await nObj.save();
    } catch (err) {
        throw Boom.notAcceptable()
    }
    return res.response(crObj)
}
const findOne = async (req, res) => {
    let obj
    const { id } = req.params
    try {
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
    delete attributes.password
    try {
        uObj = await Model.findByIdAndUpdate(id, attributes, { new: true })
    } catch (err) {
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

const profile = async (req, res) => {
    let obj, role
    const { userid } = req.auth.credentials
    try {
        obj = await Model.findById(userid)
        if (obj){
            role = await RM.findById(obj.role)
            obj.role = role.rolename
        }
    } catch (err) {
        throw Boom.notFound()
    }
    return res.response({name: obj.username, role: role.rolename})
}

module.exports = {
    find,
    create,
    findOne,
    update,
    deleteOne,
    profile
};