const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let participantes  = require('../models/participante');

router.post('/', async (req, res) => {

    let participante = new participantes ({

        nombre:req.body.nombre,
        eventoId:req.body.eventoId,
        dependencia:req.body.dependencia,
        correo:req.body.correo,
        status:req.body.status,
    });

    
   await participante.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del participante' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let participante =  ({

            nombre:req.body.nombre,
            eventoId:req.body.eventoId,
            dependencia:req.body.dependencia,
            correo:req.body.correo,
            status:req.body.status,
        });

    let ID = req.params.id;
    participantes.findByIdAndUpdate(ID, {$set: participante}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la participante: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    participantes.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el participante: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    participantes.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos de participantes' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;
