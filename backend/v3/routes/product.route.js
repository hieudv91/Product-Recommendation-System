const Controller = require('../controllers/product.controller');
const Joi = require('joi');
const PATH = '/api/products'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: Controller.find,
        options: {
            tags: ['api', 'product'],
            validate: {
                query: Joi.object({
                    q: Joi.string(),
                    _sort: Joi.string(),
                    _order: Joi.string(),
                    _start: Joi.number().integer().min(0),
                    _end: Joi.number().integer().min(0).greater(Joi.ref('_start')),
                    id: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
                    owner: Joi.string(),
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
            tags: ['api', 'product'],
            validate: {
                payload: Joi.object().keys({
                    productname: Joi.string().required(),
                    shop: Joi.string().required(),
                    owner: Joi.string().required()
                })
            }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: Controller.findOne,
        options: {
            tags: ['api', 'product'],
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
            tags: ['api', 'product'],
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
            tags: ['api', 'product'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                payload: Joi.object().keys({
                    productname: Joi.string().required(),
                    shop: Joi.string().optional(),
                    owner: Joi.string().optional(),
                    id: Joi.string()
                })
            }
        }
    }
];