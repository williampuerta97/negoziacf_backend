const { Router } = require('express');
const { login, getUser } = require('../controllers/auth.controller');

const router = Router();
/**
 * Authentications routes
 */
// Login
router.post('/login', login);
// Get authenticated user information
router.get('/me', getUser);

module.exports = router;