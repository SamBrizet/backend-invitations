const express = require('express');
const router = express.Router();
const invitadosController = require('../controllers/invitadoController');
const { protect } = require("../middlewares/authMiddleware");
const invitadoMasivoController = require('../controllers/invitadoMasivoController');


// Crear un nuevo invitado
router.post('/create', protect, invitadosController.crearInvitado);

// Obtener todos los invitados
router.get('/list', protect, invitadosController.obtenerInvitados);

// Obtener un invitado por ID
router.get('/byId/:id', protect, invitadosController.obtenerInvitadoPorId);

// Actualizar un invitado por ID
router.put('/update/:id', protect, invitadosController.actualizarInvitado);

// Eliminar un invitado por ID
router.delete('/delete/:id', protect, invitadosController.eliminarInvitado);

router.put('/confirmar-asistencia/:id', invitadosController.confirmarAsistencia);

router.get('/confirmados/:invitacionId', protect, invitadosController.obtenerInvitadosConfirmados);

router.get('/invitadosnoviomasivo', protect, invitadoMasivoController.insertarInvitadosDesdeSheetsNovio);
router.get('/invitadosnoviamasivo', invitadoMasivoController.insertarInvitadosDesdeSheetsNovia);

router.get('/novia', invitadoMasivoController.obtenerInvitadosNovia);
router.get('/novio', invitadoMasivoController.obtenerInvitadosNovio);

module.exports = router;