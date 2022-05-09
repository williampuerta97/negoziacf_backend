const jwt = require('jsonwebtoken');

/**
 * @description Generate Json Web Token function
 * @param string - user id
 * @param string - user email
 * @param string - user role
 * @returns {String} - json web token
 */
const generateJwt = (_id, email, rol) => {
    const payload = { _id, email, rol };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

};

module.exports = {
    generateJwt
};