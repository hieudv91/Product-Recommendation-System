const Controller = require('../controllers/user.controller');
const Schema = require('../schemas/user.schema');
const PATH = '/api/users'

module.exports = [
    {
        path: `${PATH}`,
        method: 'GET',
        handler: Controller.find,
        options: {
            tags: ['api', 'user'],
            validate: Schema.find,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: Controller.create,
        options: {
            tags: ['api', 'user'],
            validate: Schema.create,
            auth: { strategy: 'jwt', scope: ['admin'] }

        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: Controller.findOne,
        options: {
            tags: ['api', 'user'],
            validate: Schema.findOne,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: Controller.deleteOne,
        options: {
            tags: ['api', 'user'],
            validate: Schema.deleteOne,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: Controller.update,
        options: {
            tags: ['api', 'user'],
            validate: Schema.update,
            auth: { strategy: 'jwt', scope: ['admin'] }
        }
    },
    {
        path: `${PATH}/profile`,
        method: 'GET',
        handler: Controller.profile,
        options: {
            tags: ['api', 'user'],
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
];