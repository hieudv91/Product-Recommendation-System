const Joi = require('joi');

const find = {
    query: Joi.object({
        q: Joi.string(),
        _sort: Joi.string(),
        _order: Joi.string(),
        _start: Joi.number().integer().min(0),
        _end: Joi.number().integer().min(0).greater(Joi.ref('_start'))
    })
}
const create = {
    payload: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().optional(),
        fullname: Joi.string().optional(),
        role: Joi.string()
    })
}
const findOne = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}
const deleteOne = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}

const update = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    payload: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().optional(),
        fullname: Joi.string().optional(),
        role: Joi.string(),
        id: Joi.string()
    })
}
module.exports = {
    find, 
    create,
    findOne,
    deleteOne,
    update
};