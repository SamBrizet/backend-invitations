const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/listUsers',protect, authController.listUsers);

router.post('/verificar', authController.verificarInvitacion);

module.exports = router;