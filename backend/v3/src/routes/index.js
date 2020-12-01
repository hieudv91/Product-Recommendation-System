const UserRoutes = require('./user.route')
const AuthRoutes = require('./auth.route')
const RoleRoutes = require('./role.route')
const ProductRoutes = require('./product.route')
const ShopRoutes = require('./shop.route')
const TransactionRoutes = require('./transaction.route')
const Cronjob = require('./cronjob.route')
const Recommendation = require('./rconfig.route')
const RRule = require('./rrule.route')

const routes =
    [].concat(UserRoutes)
        .concat(AuthRoutes)
        .concat(RoleRoutes)
        .concat(ProductRoutes)
        .concat(ShopRoutes)
        .concat(TransactionRoutes)
        .concat(Cronjob)
        .concat(Recommendation)
        .concat(RRule)

convertedRoutes = routes.map(r => {
    r.options.cors = {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with', 'x-auth-token'],
        additionalExposedHeaders: ['X-Total-Count']
    }
    return r;
})

module.exports = convertedRoutes