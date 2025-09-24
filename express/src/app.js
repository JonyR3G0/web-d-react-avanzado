// =+ 1. Importar Express +=
/*
 * se puede usar CommonJS o ESModules, pero no mezclarlos
 * Usar .config directamente despues de importar dotenv es por temas de practicidad, ya que solo se usa es func.
 */
import express from 'express'
import dotenv from 'dotenv'
import fs, { read } from 'fs'

dotenv.config()

// Prueba de que se carga correctamente el env cargando el port desde .env
console.log(process.env.PORT)

// =+ 2. Montar app +=

const app = express()
const PORT = process.env.PORT

/**
 * Parsea la info de la fake db
 *
 * @returns {Object}
 */
const readJSON = () => {
  try {
    const data = fs.readFileSync('./src/db.json', 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Funcion que escribe la informacion que recibe en archivo
 *
 * @param {Object} data
 */
const writeJSON = (data) => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.get('/peliculas', (req, res) => {
  const info = readJSON()
  res.json(info)
})

app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const info = readJSON().accion.find(pelicula => pelicula.id === id)
  res.json(info)
})

// Para correcta interpretacion de JSON
app.use(express.json())

app.post('/peliculas', (req, res) => {
  const data = readJSON()
  const body = req.body
  const nuevaPeli = { id: data.accion.length + 1, ...body }
  data.accion.push(nuevaPeli)
  writeJSON(data)
  res.json(nuevaPeli)
})

app.put('/peliculas/:id', (req, res) => {
  const data = readJSON()
  const id = parseInt(req.params.id)
  const body = req.body
  const indexPelicula = data.accion.findIndex(pelicula => pelicula.id === id)
  // La razon para hacer el spread operator es para que primero se carge el estado anterior, y luego se reemplace con cualquier info que este modificada, cualquiera que sea esta.
  data.accion[indexPelicula] = { ...data.accion[indexPelicula], ...body }
  writeJSON(data)
  res.json({ messaje: 'Pelicula actualizada', data: data.accion[indexPelicula] })
})

// Mota la app
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})
