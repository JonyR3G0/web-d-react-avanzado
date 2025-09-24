import { Low } from 'lowdb'
// JSONfile de lowdb es un adapter, es decir, un "puente" que actua entre lowdb y el archivo local, y que esta pueda comunicarse y escribir los archivos, ya que lowdb solo trabaja en memoria por defecto.
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
// Esta libreria convierte los paths locales en un formato consumible por el script
import { fileURLToPath } from 'url'

// Creando rutas
// Esto tiene el proposito de cambiar algunos simbolos para que la ruta sea optima en el uso "web" se podria decir
// Convencion de rutas relativas: usar doble __
// Esto hace que el manejo de las rutas sea, "relativo" primero va a el archivo en si, despues regresa al "root" del archivo y ahi encuentra el archivo db
const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '..')
const file = join(__dirname, 'db.json')

// Archivo base
// creamos una instancia de jsonfile
const adapter = new JSONFile(file)
const datosPorDefecto = { messages: [] }

const db = new Low(adapter, datosPorDefecto)

await db.read()

await db.write()

export default db
