import React, { createContext, useReducer } from 'react'

// Creando el contexto
export const ChatContext = createContext()

// Creando el estado inicial del historial
const initialState = { messages: [] }

// Creando el reducer
const ChatReducer = () => {
// TODO Crear el reducer swich
}

// Creando el provider
export const ChatContextProvider = ({ children }) => {
//   Creando useReducer
  const [state, dispatch] = useReducer(ChatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
