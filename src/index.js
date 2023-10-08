const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/properties');
const mongoose = require('mongoose');
var routes = require('../src/routes/login.routes');
const dbURI = 'mongodb+srv://SaryChan4Ev4:L4L30M45H3rM054@mensajeria.psslkdx.mongodb.net/?retryWrites=true&w=majority'
const router=express.Router();

const conectarDB = async () => {
    try {
        await mongoose.connect( dbURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log('DB Atlas Conectado')
    } catch (error) {
        console.log(error);
        process.exit(1);  // Detiene la app
    }    
}
conectarDB();

const app = express();
app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
// app.use(routes);
// Rutas
app.use('/api', require('./routes/login.routes'));
app.use('/eventos', require('./controllers/eventos'));
app.use('/participante', require('./controllers/participantes'));
app.use('/asistencias', require('./controllers/asistencias'));
// Servidor
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );

