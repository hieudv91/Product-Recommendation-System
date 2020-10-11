const Controller = require('../controllers/auth.controller');
const Schema = require('../schemas/auth.schema');
module.exports = [
    {
        method: 'POST',
        path: '/api/login',
        options: {
            handler: Controller.login,
            pre: Controller.loginPre,
            auth: null,
            description: 'User login.',
            tags: ['api', 'Authentication'],
            validate: Schema.login
        }
    }
];