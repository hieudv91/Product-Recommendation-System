const Controller = require('../controllers/user.controller');
const Joi = require('joi');
const PATH = '/api/users'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: Controller.find,
        options: {
            tags: ['api', 'user'],
            validate: {
                query: Joi.object({
                    q: Joi.string(),
                    _sort: Joi.string(),
                    _order: Joi.string(),
                    _start: Joi.number().integer().min(0),
                    _end: Joi.number().integer().min(0).greater(Joi.ref('_start'))
                })
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with'],
                additionalExposedHeaders: ['X-Total-Count']
            }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: Controller.create,
        options: {
            tags: ['api', 'user'],
            validate: {
                payload: Joi.object().keys({
                    username: Joi.string().required(),
                    password: Joi.string().optional(),
                    fullname: Joi.string().optional(),
                    role: Joi.string()
                })
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: Controller.findOne,
        options: {
            tags: ['api', 'user'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: Controller.deleteOne,
        options: {
            tags: ['api', 'user'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: Controller.update,
        options: {
            tags: ['api', 'user'],
            validate: {
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
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    }
];