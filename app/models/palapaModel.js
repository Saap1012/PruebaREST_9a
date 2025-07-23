const mongoose = require('mongoose')

const palapSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    },
    precio:{
        type: String,
        require: true
    },
    capacidad:{
        type: Number,
        require: true
    },
    existencia:{
        type: Number,
        default: 10
    }
})

const palapaModel = mongoose.model('bebidas', palapSchema)

module.exports=palapaModel