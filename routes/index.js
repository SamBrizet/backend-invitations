const express = require('express');
const authRoutes = require('./authRoutes');
const invitationsRoutes = require('./invitaciones');
const invitadosRoutes = require('./invitadoRoutes');
const songRoutex = require('./songRoute');
// save-song

const invitacion = require('./invitacionC');

const router = express.Router();

router.use('/auth',  authRoutes);
router.use('/invitations',  invitationsRoutes);
router.use('/invitados', invitadosRoutes);
router.use('/invitacion', invitacion);
router.use('/song', songRoutex);

router.use('/invitadosnovio', invitadosRoutes);
router.use('/invitadosnovia', invitadosRoutes);

router.use('/mis-invitados', invitadosRoutes);
router.use('/mis-invitados', invitadosRoutes);


// frontend invitaciones


module.exports = router;