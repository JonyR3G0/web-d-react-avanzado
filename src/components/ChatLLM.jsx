import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
// //  importar context y custom hook
import { ChatContext } from '../context/ChatContext'
import { useLLM } from '../hooks/useLLM'

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

  // //Importar context
  const { state, dispatch } = useContext(ChatContext)
  // //Importar custom hook
  // *restructuramos para sacar la funcion async del hook, no estoy seguro del por que hacerlo asi, en vez de hacer que el hook lo haga, creo que tiene que ver con el tema async.
  const { handleQuestion } = useLLM()

  // Crear una funcion async que maneje la peticion recibe data
  async function fetchQuestion (data) {
    dispatch({ type: 'ADD', payload: { from: 'user', text: data.userInput } })
    dispatch({ type: 'LOADING', payload: true })

    try {
      const response = await handleQuestion(data.userInput)
      dispatch({ type: 'ADD', payload: { from: 'machine', text: response.replace(/<think>.*?<\/think>/gs, '') } })
    } catch (error) {
    // 3.2 catch
      console.log('ocurrio un error al conectar con el LLM : ' + error)
    } finally {
      // 3.3 Setear modo waiting en off
      dispatch({ type: 'LOADING', payload: false })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(fetchQuestion)}>
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
        {state.messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.from === 'user' ? 'Tú' : 'Bot'}:</strong>
            {msg.text}
          </p>
        ))}
        {state.loading && <p>Generando respuesta 🚀 </p>}
      </div>
      <div>
        {/* Status of waiting mode */}
      </div>
    </>
  )
}
