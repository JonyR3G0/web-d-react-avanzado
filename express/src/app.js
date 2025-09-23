require('dotenv').config()

const express = require('express')

const { infoPeliculas } = require('./peliculas')

// * Esta es la manera para acceder a el archivo .env
require('dotenv').config()

// Sacando puerto desde .env
const PORT = process.env.PORT
// Creamos app de express
const app = express()

// ? Cuantos get podemos tener? todos los que necesitemos

// Response a la raiz simple
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})

// Lanzando la app en el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
