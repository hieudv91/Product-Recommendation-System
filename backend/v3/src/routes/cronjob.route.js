const C = require('../controllers/cronjob.controller');
module.exports = [
    {
        method: 'GET',
        path: '/cronjob/test',
        options: {
            handler: C.testJob,
            auth: null,
            description: 'User login.',
        }
    }
];