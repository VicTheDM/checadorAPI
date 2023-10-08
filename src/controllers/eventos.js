const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let eventos  = require('../models/eventos');

router.post('/', async (req, res) => {

    let evento = new eventos ({
        nombre:req.body.nombre,
        asistencias_requeridas:req.body.asistencias_requeridas,
        status:req.body.status,
    });

    
   await evento.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del evento' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let evento =  ({

            nombre:req.body.nombre,
            asistencias_requeridas:req.body.asistencias_requeridas,
            status:req.body.status,
        });

    let ID = req.params.id;
    eventos.findByIdAndUpdate(ID, {$set: evento}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la evento: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    eventos.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el evento: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    eventos.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos de eventos' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;
