const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateJwt } = require("../helpers/jwt");

/**
 * @description Login function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ok: boolean, message: string}} - json
 */
const login = async (req = request, res = response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username }, { email: username }],
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "El usuario o contraseña son incorrectos",
            });
        }

        //validate password by comparing it with the hash
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                message: "La contraseña del usuario no coincide",
            });
        }

        //generate user token
        const token = await generateJwt(user._id, user.email, user.rol);

        return res.json({
            ok: true,
            token,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
};

/**
 * @description Get user information function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ok: boolean, message: string}} - json
 */
const getUser = async (req = request, res = response) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "Error en el token",
        });
    }

    try {
        //decode token and get user id and email
        const { _id, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req._id = _id;
        req.email = email;

        const user = await User.findById(req._id);

        return res.json({
            ok: true,
            user,
        });
    } catch (err) {
        return res.status(401).json({
            ok: false,
            message: "Token no valido",
        });
    }
};

module.exports = {
    login,
    getUser,
};
