const Controller = require('../controllers/role.controller');
const Joi = require('joi');
const PATH = '/api/roles'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: Controller.find,
        options: {
            tags: ['api', 'role'],
            validate: {
                query: Joi.object({
                    q: Joi.string(),
                    _sort: Joi.string(),
                    _order: Joi.string(),
                    _start: Joi.number().integer().min(0),
                    _end: Joi.number().integer().min(0).greater(Joi.ref('_start')),
                    id: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
                })
            }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: Controller.create,
        options: {
            tags: ['api', 'role'],
            validate: {
                payload: Joi.object().keys({
                    rolename: Joi.string().required(),
                    description: Joi.string().required()
                })
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: Controller.findOne,
        options: {
            tags: ['api', 'role'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: Controller.deleteOne,
        options: {
            tags: ['api', 'role'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: Controller.update,
        options: {
            tags: ['api', 'role'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                payload: Joi.object().keys({
                    rolename: Joi.string().required(),
                    description: Joi.string().optional(),
                    id: Joi.string()
                })
            }
        }
    }
];