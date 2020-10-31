const Controller = require('../controllers/shop.controller');
const S = require('../schemas/shop.schema')
const Joi = require('joi');
const PATH = '/api/shops'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: Controller.find,
        options: {
            tags: ['api', 'shop'],
            validate: S.find,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: Controller.create,
        options: {
            tags: ['api', 'shop'],
            validate: S.create,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: Controller.findOne,
        options: {
            tags: ['api', 'shop'],
            validate: S.findOne
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: Controller.deleteOne,
        options: {
            tags: ['api', 'shop'],
            validate: S.deleteOne
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: Controller.update,
        options: {
            tags: ['api', 'shop'],
            validate: S.update,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    }
];