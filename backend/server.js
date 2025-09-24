import express from 'express'
import cors from 'cors'
import { generateFromPrompt } from './ollamaService.js'
import db from './db.js'

const app = express()
const PORT = 3003

// Middlewares! para cors y json (interpretacion)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('servidor corriendo')
})

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body
  try {
    const response = await generateFromPrompt(prompt)
    res.json({ response })
    console.log(response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get para obtener mensajes desde el front
app.get('/api/messages', async (req, res) => {
  await db.read()
  res.json(db.data.messages)
})

// Post: ruta para agregar mensaje nuevo
app.post('/api/messages', async (req, res) => {
  // text, sender
  const { text, sender } = req.body
  // Fallback por si faltan datos en la request
  if (!text || !sender) {
    // salimos si no hay uno u otro
    return res.status(400).json({ error: 'Faltan datos' })
  }
  const newMessage = {
    id: Date.now(),
    text,
    sender,
    timestamp: new Date().toISOString(),
  }
  await db.read()
  db.data.messages.push(newMessage)
  await db.write()
  res.status(201).json(newMessage)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})
