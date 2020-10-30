const C = require('../controllers/role.controller');
const S = require('../schemas/role.schema')
const PATH = '/api/roles'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: C.find,
        options: {
            tags: ['api', 'role'],
            validate: S.find,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: C.create,
        options: {
            tags: ['api', 'role'],
            validate: S.create,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: C.findOne,
        options: {
            tags: ['api', 'role'],
            validate: S.findOne,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: C.deleteOne,
        options: {
            tags: ['api', 'role'],
            validate: S.deleteOne,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: C.update,
        options: {
            tags: ['api', 'role'],
            validate: S.update,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    }
];