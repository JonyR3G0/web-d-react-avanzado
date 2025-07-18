// 1. llamar el modulo nativo
// Importamos los metodos para usar el metodo http
const http = require('http')

// 2. Cramos el server (con el modulo createServer previamente importado)
// Este metodo crea el servidor y requiere un callback
const server = http.createServer((req, res) => {
  // Esto maneja el header de respuesta
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  // Este sería el cuerpo de la respuesta
  res.end("Hola mundo! I'm a serveru-chan!")
})

// Estas variables con variables de entorno y generalmente no suelen quedar expuestas
const PORT = 3000
// Método para lanzar el servidor?
// 3. Desplegar el server con listen.
server.listen(PORT, () => {
  console.log(`El server se está ejecutando en el puerto http://localhost:${PORT}`)
}
)
