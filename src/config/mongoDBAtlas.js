const mongoose = require('mongoose');
//require('dotenv').config({path:'variables.env'});
const dbURI = 'mongodb+srv://SaryChan4Ev4:L4L30M45H3rM054@mensajeria.psslkdx.mongodb.net/?retryWrites=true&w=majority'

const conectarDB = async () => {
    try {
        await mongoose.connect( dbURI,{
            ssl:true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,  
            sslValidate: false,

        });
        console.log('DB Atlas Conectado')
    } catch (error) {
        console.log(error);
        process.exit(1);  // Detiene la app
    }    
}

module.exports = conectarDB;