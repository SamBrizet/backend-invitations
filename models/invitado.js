const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  relacion: { type: String },
  confirmado: { type: Boolean, default: false }
});

const invitadoSchema = new mongoose.Schema({
  nombre_principal: { type: String, required: true },
  email: { type: String},
  telefono: { type: String },
  personas: [personaSchema], // Lista de personas adicionales
  invitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitacion', required: true },
  confirmado: { type: Boolean, default: false },
  claveInvitaccion: { type: String, required: true, unique: true },
  relacion: { type: String },
});

const Invitado = mongoose.model('Invitado', invitadoSchema);

module.exports = Invitado;