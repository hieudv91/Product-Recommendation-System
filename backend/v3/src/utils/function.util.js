const { Boom } = require('@hapi/boom');
const Bcrypt = require('bcryptjs')

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const generateHash = async function (key) {
    try {
        let salt = await Bcrypt.genSalt(10)
        let hash = await Bcrypt.hash(key, salt)
        return hash
    } catch (err) {
        throw Boom.notFound()
    }
}


module.exports = { escapeRegex, generateHash }