const Invitado = require('../models/invitado');
const bcrypt = require("bcryptjs");


// Crear un nuevo invitado
// hashear claveInvitaccion
exports.crearInvitado = async (req, res) => {
    try {
        const nuevoInvitado = new Invitado(req.body);
        const invitadoGuardado = await nuevoInvitado.save();
        res.status(201).json(invitadoGuardado);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


// Obtener todos los invitados
exports.obtenerInvitados = async (req, res) => {
    try {
        const invitados = await Invitado.find().populate('invitacion');
        res.status(200).json(invitados);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Obtener un invitado por ID
exports.obtenerInvitadoPorId = async (req, res) => {
    try {
        const invitado = await Invitado.findById(req.params.id).populate('invitacion');
        if (!invitado) {
            return res.status(404).json({message: 'Invitado no encontrado'});
        }
        res.status(200).json(invitado);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.obtenerInvitadoPorIdZ = async (id) => {
    try {
        const invitado = await Invitado.findById(id).populate('invitacion');
        return invitado;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.claveInvitaccion = async (clave) => {
    try {
        const invitado = await Invitado.findOne({claveInvitaccion: clave}).populate('invitacion');
        return invitado;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un invitado por ID
exports.actualizarInvitado = async (req, res) => {
    try {
        const invitadoActualizado = await Invitado.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!invitadoActualizado) {
            return res.status(404).json({message: 'Invitado no encontrado'});
        }
        res.status(200).json(invitadoActualizado);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Eliminar un invitado por ID
exports.eliminarInvitado = async (req, res) => {
    try {
        const invitadoEliminado = await Invitado.findByIdAndDelete(req.params.id);
        if (!invitadoEliminado) {
            return res.status(404).json({message: 'Invitado no encontrado'});
        }
        res.status(200).json({message: 'Invitado eliminado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.confirmarAsistencia = async (req, res) => {
    try {
        const {id} = req.params; // This should be the person's id
        const {asistencia} = req.body; // true for "Asistir", false for "No Asistir"

        const invitado = await Invitado.findOne({'personas._id': id});
        if (!invitado) {
            return res.status(404).json({message: 'Invitado no encontrado'});
        }

        const persona = invitado.personas.id(id);
        if (!persona) {
            return res.status(404).json({message: 'Persona no encontrada'});
        }

        persona.confirmado = asistencia;
        await invitado.save();

        res.status(200).json(invitado);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.obtenerInvitadosConfirmados = async (req, res) => {
    try {
        const {invitacionId} = req.params;
        const invitados = await Invitado.find({invitacion: invitacionId});

        // Extract all personas and include their confirmation status
        const personas = invitados.flatMap(invitado =>
            invitado.personas.map(persona => ({
                id: persona._id,
                nombre: persona.nombre,
                confirmado: persona.confirmado,
                claveInvitaccion: invitado.claveInvitaccion,
                invitadoId: invitacionId,
                relacion: invitado.relacion,
                nombre_principal: invitado.nombre_principal,
            }))
        );

        res.status(200).json(personas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};