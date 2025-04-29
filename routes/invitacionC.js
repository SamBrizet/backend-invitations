const express = require('express');
const router = express.Router();
const invitacionesController = require('../controllers/invitationsController');
const invitadosController = require('../controllers/invitadoController');

// Ruta para obtener la invitación y el invitado por sus IDs
router.get('/listInvitations/:invitacionId/:invitadoId', async (req, res) => {
  try {
    const { invitacionId, invitadoId } = req.params;
    const invitacion = await invitacionesController.obtenerInvitacionPorIdZ(invitacionId);
    const invitado = await invitadosController.obtenerInvitadoPorIdZ(invitadoId);

    if (!invitacion || !invitado) {
      return res.status(404).json({ message: 'Invitación o invitado no encontrado' });
    }

    res.status(200).json({ invitado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener la invitación por claveInvitacion
router.get('/listInvitationName/:invitacionId/:invitadoId', async (req, res) => {
  try {
    const { invitacionId, invitadoId } = req.params;
    const invitacion = await invitacionesController.obtenerInvitacionPorIdZ(invitacionId);
    const invitado = await invitadosController.claveInvitaccion(invitadoId);

    if (!invitacion || !invitado) {
      return res.status(404).json({ message: 'Invitación o invitado no encontrado' });
    }

    res.status(200).json({ invitado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;