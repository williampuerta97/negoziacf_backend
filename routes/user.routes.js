const { Router } = require('express');
const {  remove, update, getAll, getById, create } = require('../controllers/user.controller');
const { checkPermission } = require('../middlewares/permissions');
const { validarjwt } = require('../middlewares/validarjwt');

const router = Router();
/**
 * User routes
 */
// Get all users
router.get('/', getAll);
// Get active users
router.post('/', [validarjwt, checkPermission], create);
// Get user by id
router.get('/:id', [validarjwt, checkPermission], getById);
// Update user by id
router.put('/:id', [validarjwt, checkPermission], update);
// Delete user by id
router.delete('/:id', [validarjwt, checkPermission], remove);

module.exports = router;