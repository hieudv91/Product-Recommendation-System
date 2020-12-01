const C = require('../controllers/rrule.controller');
const S = require('../schemas/rrule.schema')
const PATH = '/api/rrules'

module.exports = [
    {
        path: `/api/reco_runtime/{code}/{source}`,
        method: 'GET',
        handler: C.findRules,
        options: {
            tags: ['api', 'Recommendation Rules'],
            validate: S.findRules,
            auth: null
        }
    },
    {
        path: `${PATH}`,
        method: 'GET',
        handler: C.find,
        options: {
            tags: ['api', 'Recommendation Rules'],
            validate: S.find,
            auth: null
        }
    },
    {
        path: `${PATH}`,
        method: 'POST',
        handler: C.create,
        options: {
            tags: ['api', 'Recommendation Rules'],
            validate: S.create,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'GET',
        handler: C.findOne,
        options: {
            tags: ['api', 'Recommendation Rules'],
            validate: S.findOne,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'DELETE',
        handler: C.deleteOne,
        options: {
            tags: ['api', 'Recommendation Rules'],
            validate: S.deleteOne,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    },
    {
        path: `${PATH}/{id}`,
        method: 'PUT',
        handler: C.update,
        options: {
            tags: ['api', 'Recommendation Rules'],
            validate: S.update,
            auth: { strategy: 'jwt', scope: ['admin', 'customer'] }
        }
    }
];