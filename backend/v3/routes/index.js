const CompanyRoutes = require('./company.route')
const UserRoutes = require('./user.route')
const AuthRoutes = require('./auth.route')
const RoleRoutes = require('./role.route')
const ProductRoutes = require('./product.route')
const ShopRoutes = require('./shop.route')

const routes =
    [].concat(CompanyRoutes)
        .concat(UserRoutes)
        .concat(AuthRoutes)
        .concat(RoleRoutes)
        .concat(ProductRoutes)
        .concat(ShopRoutes)

convertedRoutes = routes.map(r => {
    r.options.cors = {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with', 'x-auth-token'],
        additionalExposedHeaders: ['X-Total-Count']
    }
    return r;
})

module.exports = convertedRoutes