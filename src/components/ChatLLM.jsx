import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// importar context y custom hook

/**
 * Este es un objeto que retorna las validaciones de yup
*
 * @type {*}
 */
const yupSchema = yup.object({
  userInput: yup
    .string()
    .required('₍₍⚞(˶˃ ꒳ ˂˶)⚟⁾⁾ El mensaje es obligatorio!!!! ñaka ñaka'),
})

export const ChatLLM = () => {
  // Crea un Yup resolver para hacer una verificacion simple al field de input
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema)
  })

  // Importar context
  // Importar custom hook

  // Crear una funcion async que maneje la peticion recibe data
  // 1.uso de dispatch con el reducer context, manda primero info y payload para historial
  // 2. Setea el modo de waiting
  // 3.try/catch con custom hook
  // 3.1 envia el payload (promt)
  // 3.2 recibe la respuesta y crea un dispatch en el reducer pero por parte del LLM
  // 3.3 catch
  // 3.4 Setear modo waiting en off

  return (
    <>
      <form onSubmit={handleSubmit(handleQuestion)}>
        <input
          type='text'
          {...register('userInput')}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        {errors.userInput && <p>{errors.userInput.message}</p>}
        <button
          className='w-full py-2 rounded transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
        >Preguntar
        </button>
      </form>
      <div>
        {/* Acceso al historial de preguntas y respuestas, 2 mapeo con map y aplicacion de estilos condicional si es llm/usuario */}
      </div>
      <div>
        {/* Status of waiting mode */}
      </div>
    </>
  )
}
