const express = require('express');
const cors = require('cors');
const { PORT } = require('./src/config/properties');
const mongoose = require('mongoose');
var routes = require('./src/routes/login.routes');
const dbURI = 'mongodb+srv://SaryChan4Ev4:L4L30M45H3rM054@mensajeria.psslkdx.mongodb.net/test?ssl=true?retryWrites=true&w=majority'
const router=express.Router();
const  http = require('http')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const fs = require('fs')
const conectarDB = async () => {
    try {
        await mongoose.connect( dbURI,{
            useNewUrlParser: true,
            ssl: true,
            useUnifiedTopology: true,  
            sslValidate: false
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
app.use('/api', require('./src/routes/login.routes'));
app.use('/eventos', require('./src/controllers/eventos'));
app.use('/participante', require('./src/controllers/participantes'));
app.use('/asistencias', require('./src/controllers/asistencias'));
// Servidor
http.createServer({
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')
}, app).listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );
// app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );

