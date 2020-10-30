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
    })
}
const create = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    payload: Joi.object().keys({
        rolename: Joi.string().required(),
        description: Joi.string().required()
<<<<<<< HEAD
    }).options({ allowUnknown: true }),
=======
    })
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
}
const findOne = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    params: Joi.object().keys({
        id: Joi.string().required()
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
<<<<<<< HEAD

=======
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
const update = {
    headers: Joi.object({
        Authorization: Joi.string()
    }).options({ allowUnknown: true }),
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    payload: Joi.object().keys({
        rolename: Joi.string().required(),
        description: Joi.string().optional(),
        id: Joi.string()
<<<<<<< HEAD
    }).options({ allowUnknown: true }),
}
module.exports = {
    find,
    create,
    findOne,
    deleteOne,
    update
=======
    })
}
module.exports = {
    find, create, findOne, deleteOne, update
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
};