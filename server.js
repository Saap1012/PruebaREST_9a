const app = require('./app/app')
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Aplicacion corriendo en puerto ${PORT}`);
})