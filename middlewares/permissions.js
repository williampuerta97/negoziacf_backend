// permission middleware
/**
 * @description Check persmissions Middleware
 * @param {Request} req - request
 * @param {Response} res   - response
 * @param {Function} next - next
 * @returns {Response} - response
 * @throws {Error} - if rol is not valid
 */
const checkPermission = (req, res, next) => {
    
    try {
        const { rol } = req;
        
        if (rol !== "ADMIN") {
            return res.status(401).json({
                ok: false,
                message: "No tienes permisos para realizar esta acción",
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al validar permisos",
            error,
        });
    }
    next();
};

module.exports = {
    checkPermission,
};