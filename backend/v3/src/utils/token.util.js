'use strict'

const Jwt = require('jsonwebtoken')

function createToken(user, expirationPeriod, logger) {
  const Log = logger.bind('token')
  try {
    let token = {}


      const tokenUser = user

      token = Jwt.sign(
        {
          user: tokenUser
        },
        'jwtSecret',
        { algorithm: 'HS256', expiresIn: expirationPeriod }
      )
    

    return token
  } catch (err) {
    errorHelper.handleError(err, Log)
  }
}

module.exports = createToken