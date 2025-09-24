import express from 'express'
import cors from 'cors'
import { generateFromPrompt } from './ollamaService.js'

const app = express()
const PORT = 3003

// Middlewares! para cors y json (interpretacion)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('servidor corriendo')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})
