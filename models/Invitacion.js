const mongoose = require('mongoose');

const invitacionSchema = new mongoose.Schema({
  titulo: {type: String, required: true},
  fecha_evento: {type: Date, required: true},  // Fecha del evento
  hora_evento: {type: String},                  // Hora del evento
  fecha_iglesia: {type: Date, required: true},  // Fecha de la iglesia
  hora_iglesia: {type: String},                 // Hora de la iglesia
  ubicacion: {type: String, required: true},    // Ubicación de texto
  ubicacion_google: {type: String},             // Enlace de Google Maps
  recepcion_iglesia: {type: String},            // Dirección de la recepción de la iglesia
  recepcion_evento: {type: String},             // Dirección de la recepción del evento
  mensaje1: {type: String},
  mensaje2: {type: String},
  mensaje3: {type: String},
  mensaje4: {type: String},
  mensaje5: {type: String},
  mensaje6: {type: String},
  mensaje_vestimenta: {type: String},           // Mensaje para la vestimenta
  mensaje_biblico: {type: String},              // Mensaje bíblico para la invitación
  cita_biblica: {type: String},                 // Cita bíblica
  novio: {type: String},                       // Nombre del novio
  novia: {type: String},                       // Nombre de la novia
  padredelnovio: {type: String},               // Nombres de los padres de los novios  
  madredelnovio: {type: String},               // Nombres de los padres de los novios
  padredelanovia: {type: String},              // Nombres de los padres de la novia
  madredelanovia: {type: String},              // Nombres
  hijos: {type: [String]},                     // Nombres de los hijos (si los hay)
  padrino_iglesia: {type: String},             // Nombres de los padrinos de iglesia
  madrina_iglesia: {type: String},             // Nombre de la madrina de iglesia
  padrino_matrimonio_civil: {type: String},    // Nombre del padrino del matrimonio civil
  madrina_matrimonio_civil: {type: String},    // Nombre de la madrina del matrimonio civil
  estado: {type: String, enum: ['activa', 'cancelada', 'finalizada'], default: 'activa'},
  fecha_creacion: {type: Date, default: Date.now},
  clave: {type: String, required: true},
});

// Encriptar clave antes de guardar
invitacionSchema.pre('save', async function(next) {
  if (!this.isModified('clave')) return next();
  this.clave = await bcrypt.hash(this.clave, 10);
  next();
});



module.exports = mongoose.model('Invitacion', invitacionSchema);
