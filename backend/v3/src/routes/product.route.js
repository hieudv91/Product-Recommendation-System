const C = require('../controllers/product.controller');
const S = require('../schemas/product.schema')
const PATH = '/api/products'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: C.find,
        options: {
            tags: ['api', 'product'],
            validate: S.find,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: C.create,
        options: {
            tags: ['api', 'product'],
            validate: S.create,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: C.findOne,
        options: {
            tags: ['api', 'product'],
            validate: S.findOne,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: C.deleteOne,
        options: {
            tags: ['api', 'product'],
            validate: S.deleteOne,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: C.update,
        options: {
            tags: ['api', 'product'],
            validate: S.update,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    }
];