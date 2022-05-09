const { response } = require("express");
const jwt = require('jsonwebtoken');

/**
 * @description validate Json Web Token Middleware
 * @param {Request} req - request
 * @param {Response} res   - response
 * @param {Function} next - next
 * @returns {Response} - response
 * @throws {Error} - if token is not valid
 */
const validarjwt = (req, res = response, next) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Error en el token'
        });
    }

    try {

        const { _id, email, rol } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req._id = _id;
        req.email = email;
        req.rol = rol;

    } catch (err) {
        return res.status(401).json({
            ok: false,
            message: 'Token no valido'
        });
    }

    next();
};

module.exports = {
    validarjwt
};