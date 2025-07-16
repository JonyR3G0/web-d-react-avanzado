import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useState } from 'react'

const yupSchema = yup.object({
  userInput: yup
    .string()
    .min(3, 'The message has to be 3 characters minimum')
    .required('Message is obligatory'),
})

export const App = () => {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema)
  })
  const handleQuestion = async (data) => {
    console.log(data.userInput)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:11434/api/chat', {
        model: 'deepseek-r1:1.5b',
        messages: [
          { role: 'user', content: data.userInput }
        ],
        stream: false
      })
      console.log(res.data.message.content)
      setResponse(res.data.message.content)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

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
        <p>{loading ? 'Generando respuesta 🚀' : response}</p>
      </div>
    </>
  )
}
