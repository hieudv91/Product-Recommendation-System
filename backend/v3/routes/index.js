const CompanyRoutes = require('./company.route')
const UserRoutes = require('./user.route')
const AuthRoutes = require('./auth.route')
const RoleRoutes = require('./role.route')

const routes =
    [].concat(CompanyRoutes)
        .concat(UserRoutes)
        .concat(AuthRoutes)
        .concat(RoleRoutes)

module.exports = routes