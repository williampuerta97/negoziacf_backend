const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * @description Create user function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ ok: boolean, user: Object, message: string}} - json
 */
const create = async (req = request, res = response) => {
    const { name, lastName, document_number, phone, email, username, password, rol } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }

        // Encrypt password
        const hash = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, hash);

        const newUser = await User.create({
            name,
            lastName,
            document_number,
            phone,
            email,
            username,
            password: passwordHash,
            rol
        });

        return res.json({
            ok: true,
            user: newUser,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error en el servidor',
            error,
        });
    }
}

/**
 * @description Delete user function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ ok: boolean, user: Object, message: string}} - json
 */
const remove = async (req = request, res = response) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario que se trata de eliminar no existe'
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        return res.status(201).json({
            ok: true,
            message: 'Usuario eliminado correctamente',
            user: deletedUser
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

}

/**
 * @description Update user function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ ok: boolean, user: Object, message: string}} - json
 */
const update = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, email, username, ...rest } = req.body;

    try {

        const user = await User.findByIdAndUpdate(id, rest);
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no se encuentra registrado'
            });
        }

        return res.status(201).json({
            ok: true,
            user,
            message: 'Usuario actualizado exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }
}

/**
 * @description Get all users function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ total: number, users: Object[]}} - json
 */
const getAll = async (req = request, res = response) => {
    
    try {
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find()
        ]);

        return res.status(201).json({
            total,
            users
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

};

/**
 * @description Get a user by Id function
 * @param {Request} req - request
 * @param {Response} res   - response
 * @returns {{ ok: boolean, user: Object}} - json
 */
const getById = async(req = request, res = response) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id);


        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'No se encontró el usuario'
            });
        }

        return res.status(200).json({
            ok: true,
            user : user
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            message: 'Error en el servidor'
        });
    }

};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};