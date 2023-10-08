const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let asistencias  = require('../models/asistencias');

router.post('/', async (req, res) => {

    let asistencia = new asistencias ({

        participanteId:req.body.participanteId,
        eventoId:req.body.eventoId,
        fecha:req.body.fecha,
        status:req.body.status,
    });

    
   await asistencia.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del asistencia' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let asistencia =  ({

            participanteId:req.body.participanteId,
            eventoId:req.body.eventoId,
            fecha:req.body.fecha,
            status:req.body.status,
        });

    let ID = req.params.id;
    asistencias.findByIdAndUpdate(ID, {$set: asistencia}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la asistencia: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    asistencias.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la asistencia: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    asistencias.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos de asistencias' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;
