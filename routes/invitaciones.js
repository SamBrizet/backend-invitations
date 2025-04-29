const express = require('express');
const invitacionesController = require('../controllers/invitationsController');
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/listInvitations', protect, invitacionesController.obtenerInvitaciones);
router.get('/listInvitations/:id', protect, invitacionesController.obtenerInvitacionPorId);
router.post('/createInvitation',protect, invitacionesController.crearInvitacion);
router.put('/updateInvitation/:id',protect, invitacionesController.actualizarInvitacion);
router.delete('/deleteInvitation/:id',protect, invitacionesController.eliminarInvitacion);

module.exports = router;