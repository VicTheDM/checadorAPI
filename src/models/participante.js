const { Schema, model } = require('mongoose');


const participanteSchema = new Schema({
    
    nombre: { type: String},
    eventoId : { type: String},
    dependencia : { type: String},
    correo : { type: String},
    status : { type: Number}
    
})

module.exports = model('participante', participanteSchema);