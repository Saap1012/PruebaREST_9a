const palapaModel = require('../models/palapaModel')

// Función para obtener todas las bebidas
function buscarTodo(req,res){
    palapaModel.find({}) // Busca todos los documentos
    .then(bebidas =>{
        if(bebidas.length){
            return res.status(200).send({bebidas}) // Si hay resultados, responde con status 200
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e => {return res.status(404).send({mensaje: `Error al solicitar 
    la infoemacion ${e}`})})
}

// Función para agregar una nueva bebida
function agregar(req,res){
    //console.log(req.body)
    new palapaModel(req.body).save() // Crea y guarda un nuevo documento con los datos enviados
    .then(info=>{
        return res.status(200).send({
            mensaje:"La informacion se guardo con exito",
            info // Devuelve el objeto guardado
        })
    })
    .catch(e =>{
        return res.status(404).send({
            mensaje:`Error al guardar la informacion ${e}` 
        })
    })
}

// Función que busca una bebida según un campo dinámico (key=value) y lo pasa al siguiente middleware
// la funcion tiene una propiedad y un atributo si existe crea bebidas 
function buascarBebida(req, res, next){
    if (!req.body)req.body={}
    let consulta={}
    consulta[req.params.key]=req.params.value // Crea un objeto con el campo y valor de búsqueda desde la URL
    console.log(consulta) // Muestra la consulta en consola
    palapaModel.find(consulta) // Busca en la base de datos con esa condición
    .then(bebidas =>{
        if(!bebidas.length)return next() // Si no hay resultados, pasa al siguiente middleware
            req.body.bebidas= bebidas // Si hay, los guarda en req.body
            return next()
    })
    .catch(e=>{
        req.body.e = e // Si hay error, lo guarda en req.body
        return next()
    })
}

// Función que muestra los resultados de la búsqueda realizada anteriormente
function mostrarBebida(req,res){
    if(req.body.e) return res.status(404).send({mensaje:"Error al consultar la informacion"})
    if(!req.body.bebidas) return res.status(204).send({mensaje:"No hay informacion que mostrar"})
    let bebidas = req.body.bebidas // Si hay resultados, los recupera
    return res.status(200).send({bebidas}) // Y los envía con status 200
}

function eliminarBebida(req,res){
    var bebidas = {}
    bebidas= req.body.bebidas
    palapaModel.deleteOne(bebidas[0])
    .then(inf =>{
        return res.status(200).send({mesaje:"Bebida eliminada"})
    })
    .catch(e =>{
        return res.status(404).send({mesaje:"error al eliminar la bebida",e})
    })
}

function actualizarBebida(req, res) {
    const { key, value } = req.params;
palapaModel.findOneAndUpdate({ [key]: value }, req.body, { new: true })
        .then(bebida => {
            if (bebida) {
                return res.status(200).send({ mensaje: "La bebida se actualizó correctamente",bebida});
            }
            return res.status(404).send({mensaje: "No se encontró la bebida para actualizar"});
        })
        .catch(e => {
            return res.status(500).send({mensaje: `Error al actualizar la bebida: ${e}`});
        });
}



// Exporta todas las funciones del controlador
module.exports = {
    buscarTodo,
    agregar,
    buascarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}