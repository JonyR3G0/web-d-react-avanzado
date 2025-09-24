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

// Mota la app
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})
