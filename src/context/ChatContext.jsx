import React, { createContext, useReducer } from 'react'

// Creando el contexto
export const ChatContext = createContext()

// Creando el estado inicial del historial
const initialState = { messages: [] }

// Creando el reducer
// ?El reducer pasa por defecto un state (el estado previo del reducer) y un action, que es el payload llamado al hacer distpatch
const ChatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    case 'LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
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
