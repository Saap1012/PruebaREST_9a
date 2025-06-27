const mongoose = require('mongoose') //libreria para hacer mas aguil la conexion
const CONFIG= require('./configuracion') // Importar la cadena de conexion


module.exports={
    conection : null, 
    connect: () => {
        if(this.conection) return this.conection
        return mongoose.connect(CONFIG.DB)
        .then(conn=>{ 
            this.conection = conn;
            console.log('La conexion de realizo con exito');
            return conn;
        })
        .catch(e => console.log('Error en la conexion',e))
    }
}