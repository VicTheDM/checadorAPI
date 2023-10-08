const { Schema, model } = require('mongoose');


const asistenciasSchema = new Schema({
    
    participanteId: { type: String},
    eventoId : { type: String},
    fecha : { type: String},
    status : { type: Number}

})

module.exports = model('asistencias', asistenciasSchema);