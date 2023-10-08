const { Schema, model } = require('mongoose');


const eventosSchema = new Schema({
    
    nombre: { type: String},
    asistencias_requeridas : { type: Number},
    status : { type: Number}
})

module.exports = model('eventos', eventosSchema);