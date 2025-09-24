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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})
