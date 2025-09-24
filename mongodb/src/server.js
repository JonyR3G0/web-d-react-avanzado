import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/users.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello Atlas 🔥😼')
})

// Middleware
app.use(express.json())
app.use('/api', router)

// Connect pide una uri o key que conecte con Atlas
// El proceso mongoose es una promesa que pide concatenacion
mongoose
.connect(process.env.MONGO_MASTER)
.then(()=> console.log('conectado a la base de datos'))
.catch(error => console.log(error))

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})