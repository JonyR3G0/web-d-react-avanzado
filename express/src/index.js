// * Esta es la manera para acceder a el archivo .env
require('dotenv').config()

console.log(process.env.PORT)
console.log(process.env.S_NAME)

// * Existe un objeto llamado process que tiene muchos datos sobre el servidor
console.log(process)
console.log(process.env)
console.log(process.env.PORT)
