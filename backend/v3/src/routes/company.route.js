const Controller = require('../controllers/company.controller');
const Joi = require('joi');
const PATH = '/api/companies'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: Controller.find,
        options: {
            tags: ['api'],
            validate: {
                query: Joi.object({
                    q: Joi.string(),
                    _sort: Joi.string(),
                    _order: Joi.string(),
                    _start: Joi.number().integer().min(0),
                    _end: Joi.number().integer().min(0).greater(Joi.ref('_start'))
                })
            }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: Controller.create,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    name: Joi.string().required(),
                    city: Joi.string().optional(),
                    address: Joi.string().optional(),
                })
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: Controller.findOne,
        options: {
            tags: ['api'],
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
        handler: Controller.delete,
        options: {
            tags: ['api'],
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
            tags: ['api'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                payload: Joi.object().keys({
                    name: Joi.string().required(),
                    city: Joi.string().optional(),
                    address: Joi.string().optional(),
                    id: Joi.string()
                })
            }
        }
    }
];