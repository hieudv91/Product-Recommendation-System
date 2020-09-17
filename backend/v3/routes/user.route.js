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
            auth: { strategy: 'jwt', scope: ['admin'] }
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
            auth: { strategy: 'jwt', scope: ['admin'] }

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
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
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
            auth: { strategy: 'jwt', scope: ['admin'] }
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
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    }
];