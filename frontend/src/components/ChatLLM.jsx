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
      text,
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
    reset,
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
    reset()

    try {
      dispatch({
        type: 'ADD',
        payload: { from: 'user', text: data.userInput },
      })
      dispatch({ type: 'LOADING', payload: true })
      postDb('user', data.userInput)

      const response = await handleQuestion(data.userInput)
      dispatch({
        type: 'ADD',
        payload: {
          from: 'machine',
          text: response.replace(/<think>.*?<\/think>/gs, '').replace(/\n\n/g, ''),
        },
      })
      postDb('machine', response.replace(/<think>.*?<\/think>/gs, '').replace(/\n\n/g, ''))
    } catch (error) {
      console.log('Error:', error)
      // Manejar el error apropiadamente sin que cause reload
    } finally {
      dispatch({ type: 'LOADING', payload: false })
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-slate-900' />

      {/* Main Container */}
      <div className='relative z-10 max-w-4xl mx-auto p-4 lg:p-8 flex flex-col h-screen'>
        {/* Chat Messages Container */}
        <div
          className='flex-1 mb-6 overflow-hidden'
        >
          <div className='h-full bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden'>
            <div className='h-full overflow-y-auto p-4 lg:p-6 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600'>
              {state.messages.length === 0
                ? (
                  <div className='flex items-center justify-center h-full'>
                    <div className='text-center animate-fade-in'>
                      <div className='mx-auto mb-4 b flex items-center justify-center animate-pulse'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='90' height='90' role='img' aria-labelledby='title desc'>
                          <circle cx='32' cy='32' r='30' fill='#ffffff' />

                          <circle cx='32' cy='32' r='20' fill='#e60012' />

                          <g transform='translate(0,7)' fill='#fff' stroke='#fff' stroke-width='3'>
                            <path d='M24.5 25.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z' />
                            <path d='M43.5 25.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z' />
                            <path d='M25.5 33c2 2.2 6 2.2 8 0' stroke='#fff' stroke-width='4' fill='none' stroke-linecap='round' />
                          </g>
                        </svg>
                      </div>
                      <p className='text-gray-400 text-lg font-medium'>
                        Holi, soy Kawito, („• ֊ •„)੭
                      </p>
                      <p className='text-gray-500 text-sm mt-2'>
                        No soy muy inteligente 👉👈 pero, escribe tu mensaje para hablar conmigo
                      </p>
                    </div>
                  </div>
                  )
                : (
                  <>
                    {state.messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                        msg.from === 'user' ? 'justify-end' : 'justify-start'
                      } animate-slide-up`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`max-w-[80%] lg:max-w-[70%] ${
                          msg.from === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50'
                        } rounded-2xl px-4 py-3 lg:px-6 lg:py-4 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group`}
                        >
                          <div className='flex items-start space-x-3'>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              msg.from === 'user'
                                ? 'bg-white/20 text-white'
                                : 'bg-white'
                            } transition-transform group-hover:scale-110`}
                            >
                              {msg.from === 'user'
                                ? ('TÚ')
                                : (
                                  <img
                                    src='/kawitoIcon.svg'
                                    alt='Bot icon'
                                    className='w-15 h-15'
                                  />
                                  )}
                            </div>

                            <div className='flex-1 min-w-0'>
                              <p className='text-sm lg:text-base leading-relaxed break-words whitespace-pre-wrap'>
                                {msg.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {state.loading && (
                      <div className='flex justify-start animate-slide-up'>
                        <div className='bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-3 lg:px-6 lg:py-4 shadow-lg'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 rounded-full bg-white animate-pulse items-center justify-center' />
                            <div className='flex items-center space-x-2'>
                              <span className='text-gray-300 text-sm lg:text-base'>
                                Un momentito, estoy pensando con todos mis tokens (ꈍᴗꈍ)♡
                              </span>
                              <div className='flex space-x-1'>
                                <div
                                  className='w-2 h-2 bg-red-500 rounded-full animate-bounce'
                                  style={{ animationDelay: '0ms' }}
                                />
                                <div
                                  className='w-2 h-2 bg-white rounded-full animate-bounce'
                                  style={{ animationDelay: '150ms' }}
                                />
                                <div
                                  className='w-2 h-2 bg-red-500 rounded-full animate-bounce'
                                  style={{ animationDelay: '300ms' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                  )}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className='bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 lg:p-6 shadow-2xl'>
          <form onSubmit={handleSubmit(fetchQuestion)} className='space-y-4'>
            <div className='relative'>
              <input
                type='text'
                {...register('userInput')}
                placeholder='Escribe tu mensaje...'
                className='w-full px-4 py-3 lg:px-6 lg:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm lg:text-base resize-none'
                disabled={state.loading}
              />
              <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                <button
                  type='submit'
                  disabled={state.loading}
                  className='p-2 lg:p-3 rounded-full bg-white text-slate-800 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg'
                >
                  <svg
                    className='w-4 h-4 lg:w-5 lg:h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {errors.userInput && (
              <div className='animate-shake'>
                <p className='text-red-400 text-xs lg:text-sm bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2 backdrop-blur-sm'>
                  {errors.userInput.message}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>
        {`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
          }

          .animate-slide-up {
            animation: slide-up 0.6s ease-out forwards;
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }

          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }

          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }

          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: rgb(75 85 99);
            border-radius: 3px;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background-color: rgb(107 114 128);
          }
        `}
      </style>
    </div>
  )
}
