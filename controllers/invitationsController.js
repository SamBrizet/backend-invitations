const Invitacion = require('../models/Invitacion');

// Controlador para obtener todas las invitaciones
exports.obtenerInvitaciones = async (req, res) => {
    try {
        const invitaciones = await Invitacion.find();
        res.status(200).json(invitaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las invitaciones' });
    }
};

// Controlador para obtener una invitación por ID
exports.obtenerInvitacionPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const invitacion = await Invitacion.findById(id);
        if (!invitacion) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        res.status(200).json(invitacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la invitación' });
    }
};


exports.obtenerInvitacionPorIdZ = async (id) => {
    try {
      const invitacion = await Invitacion.findById(id);
      return invitacion;
    } catch (error) {
      throw new Error(error.message);
    }
  };



// Controlador para crear una nueva invitación
exports.crearInvitacion = async (req, res) => {
    const {
        titulo, fecha_evento,hora_evento, fecha_iglesia, hora_iglesia, ubicacion, ubicacion_google, 
        recepcion_iglesia, recepcion_evento, mensaje1, mensaje2, mensaje3, mensaje4, 
        mensaje5, mensaje6, mensaje_vestimenta, mensaje_biblico,cita_biblica, novio, novia, 
        padredelnovio, madredelnovio, padredelanovia, madredelanovia, hijos, 
        padrino_iglesia, madrina_iglesia, padrino_matrimonio_civil, madrina_matrimonio_civil, 
        estado
    } = req.body;
    
    try {
        const nuevaInvitacion = new Invitacion({
            titulo,
            fecha_evento,
            hora_evento,
            fecha_iglesia,
            hora_iglesia,
            ubicacion,
            ubicacion_google,
            recepcion_iglesia,
            recepcion_evento,
            mensaje1,
            mensaje2,
            mensaje3,
            mensaje4,
            mensaje5,
            mensaje6,
            mensaje_vestimenta,
            mensaje_biblico,
            cita_biblica,
            novio,
            novia,
            padredelnovio,
            madredelnovio,
            padredelanovia,
            madredelanovia,
            hijos,
            padrino_iglesia,
            madrina_iglesia,
            padrino_matrimonio_civil,
            madrina_matrimonio_civil,
            estado
        });
        const invitacionGuardada = await nuevaInvitacion.save();
        res.status(201).json(invitacionGuardada);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la invitación' });
    }
};

// Controlador para actualizar una invitación
exports.actualizarInvitacion = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    
    try {
        const invitacionActualizada = await Invitacion.findByIdAndUpdate(id, datosActualizados, {
            new: true, // Retorna la invitación actualizada
            runValidators: true // Aplica las validaciones del esquema
        });
        
        if (!invitacionActualizada) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        
        res.status(200).json(invitacionActualizada);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la invitación' });
    }
};

// Controlador para eliminar una invitación
exports.eliminarInvitacion = async (req, res) => {
    const { id } = req.params;
    
    try {
        const invitacionEliminada = await Invitacion.findByIdAndDelete(id);
        if (!invitacionEliminada) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        res.status(200).json({ message: 'Invitación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la invitación' });
    }
};
