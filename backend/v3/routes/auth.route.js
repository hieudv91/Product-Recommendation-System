const Controller = require('../controllers/auth.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/api/login',
        options: {
            handler: Controller.login,
            pre: Controller.loginPre,
            auth: null,
            description: 'User login.',
            tags: ['api', 'Auth'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }
];