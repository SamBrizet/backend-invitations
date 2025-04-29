// rutas para seleccionar una mesa para un invitado

const express = require('express');
const router = express.Router();

const mesasController = require('../controllers/mesasController');

// Obtener todas las mesas
router.get('/list', mesasController.obtenerMesas);

// Obtener una mesa por ID

router.get('/byId/:id', mesasController.obtenerMesaPorId);

// Crear una mesa

router.post('/create', mesasController.crearMesa);


// Actualizar una mesa por ID

router.put('/update/:id', mesasController.actualizarMesa);