'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const Routes = require('./routes/index')
const db = require('./database').db;

const init = async () => {

    const server = Hapi.server({
        port: 8080,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {

            return h.redirect('/documentation');
        }
    });
    server.route(Routes)

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.0',
        },
        grouping: 'tags',
        tagsGroupingFilter: (tag) => tag !== 'api'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();