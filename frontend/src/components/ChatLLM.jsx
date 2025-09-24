import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
// //  importar context y custom hook
import { ChatContext } from '../context/ChatContext'
import { useLLM } from '../hooks/useLLM'
import axios from 'axios'

// TODO Importar axios, usar un useeffect para recuperar con un get los datos desde la bd y conectar el send de cada mensaje a la bd.

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

async function postDb (sender, text) {
  try {
    // Esperar la petición POST del usuario
    await axios.post('http://localhost:3003/api/messages', {
      sender,
      text
    })
  } catch (error) {
    console.log(error)
  }
}

export const ChatLLM = () => {
  // Crea un Yup resolver para hacer una verificacion simple al field de input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  })

  const { state, dispatch } = useContext(ChatContext)
  // *restructuramos para sacar la funcion async del hook, no estoy seguro del por que hacerlo asi, en vez de hacer que el hook lo haga, creo que tiene que ver con el tema async.
  const { handleQuestion } = useLLM()

  // Este useEffect hace un get por axios para cargar el historial de mensajes guardado en la bd.
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/messages')
        response.data.forEach((m) => {
          dispatch({
            type: 'ADD',
            payload: { from: m.sender, text: m.text },
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [])

  async function fetchQuestion (data) {
    try {
      dispatch({ type: 'ADD', payload: { from: 'user', text: data.userInput } })
      dispatch({ type: 'LOADING', payload: true })
      postDb('user', data.userInput)

      const response = await handleQuestion(data.userInput)
      dispatch({
        type: 'ADD',
        payload: {
          from: 'machine',
          text: response.replace(/<think>.*?<\/think>/gs, ''),
        },
      })
      postDb('machine', response.replace(/<think>.*?<\/think>/gs, ''))
    } catch (error) {
      console.log('Error:', error)
    // Manejar el error apropiadamente sin que cause reload
    } finally {
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
        <button className='w-full py-2 rounded transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700' type='submit'>
          Preguntar
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
      <div>{/* Status of waiting mode */}</div>
    </>
  )
}
