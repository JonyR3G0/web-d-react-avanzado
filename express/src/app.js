require('dotenv').config()

const express = require('express')

require('dotenv').config()

// Sacando puerto desde .env
const PORT = process.env.PORT
// Creamos app de express
const app = express()

// Response a la raiz simple
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

// Lanzando la app en el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
