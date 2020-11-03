'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Jwt = require('hapi-auth-jwt2')
const HapiCron = require('hapi-cron');
const Routes = require('./routes/index')
const db = require('./database').db;
const { getUserById } = require('./utils/auth.util')
const cronJobs = require('./cronjob')


const validate = async function (decoded, request, h) {
    if (getUserById(decoded.user.id)) {
        return {
            isValid: true,
            credentials: {
                username: decoded.user.username,
                userid: decoded.user.id,
                scope: decoded.user.role.toLowerCase()
            }
        };
    }
    else {
        return { isValid: false };
    }
};

const init = async () => {

    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
        routes: {
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        console.error('ValidationError:', err.message);
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {

            return h.redirect('/documentation');
        }
    });


    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.0',
        },
        grouping: 'tags',
        tagsGroupingFilter: (tag) => tag !== 'api',
    };

    await server.register([
        Jwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.auth.strategy('jwt', 'jwt',
        {
            key: 'NeverShareYourSecret',
            validate
        });
    server.route(Routes)
/*
    await server.register({
        plugin: HapiCron,
        options: {
            jobs: cronJobs
        }
    });
*/
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();