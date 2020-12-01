const Joi = require('joi');

const find = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    query: Joi.object({
        q: Joi.string(),
        _sort: Joi.string(),
        _order: Joi.string(),
        _start: Joi.number().integer().min(0),
        _end: Joi.number().integer().min(0).greater(Joi.ref('_start')),
        id: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
        source:Joi.string(),
        owner: Joi.string(),
        shop: Joi.string(),
    })
}
const create = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    payload: Joi.object().keys({
        source: Joi.string(),
        target: Joi.string(),
        value: Joi.string(),
        shop: Joi.string().required(),
        owner: Joi.string().required()
    }).options({ allowUnknown: true }),
}
const findOne = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}
const findRules = {
    params: Joi.object().keys({
        code: Joi.string().required(),
        source: Joi.string().required(),
    })
}
const deleteOne = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}
const update = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    payload: Joi.object().keys({
        source: Joi.string().required(),
        target: Joi.string(),
        value: Joi.string(),
        shop: Joi.string().required(),
        owner: Joi.string().required()
    }).options({ allowUnknown: true }),
}
module.exports = {
    find,
    create,
    findOne,
    deleteOne,
    update,
    findRules
};