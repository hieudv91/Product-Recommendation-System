const C = require('../controllers/cronjob.controller');
module.exports = [
    {
        method: 'GET',
        path: '/cronjob/gobt',
        options: {
            handler: C.generateOftenBoughtTogether,
            auth: null,
            description: 'Production recommendation generation process.',
        }
    }
];