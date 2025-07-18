// Importamos el módulo de express
const express = require('express')

// Creamos una aplicacion con express
const app = express()

// Definimos el puerto (mismo caso de antes, no es ideal acá) que va a escuchar el servidor
const PORT = 3300

// Creamos el contenido que retorna la app
app.get('/', (req, res) => {
  res.send('Holiwiwis')
})

// Escuchamos (lanzamos) el endpoint
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
