const express = require('express')
const router = express.Router()
// Importa el controlador
const palapaController = require('../controllers/palapaController')

// Ruta GET para obtener todas las bebidas
router.get('/bebidas',palapaController.buscarTodo)
// Ruta POST para agregar una nueva bebida
.post('/bebidas',palapaController.agregar)
// Ruta GET con parámetros dinámicos para buscar una bebida específica
.get('/bebidas/:key/:value',palapaController.buascarBebida,palapaController.mostrarBebida)
.delete('/bebidas/:key/:value',palapaController.buascarBebida,
    palapaController.eliminarBebida
)
.put('/bebidas/:key/:value', palapaController.actualizarBebida)

module.exports=router