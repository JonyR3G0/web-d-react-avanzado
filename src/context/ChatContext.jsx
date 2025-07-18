import React, { createContext } from 'react'

// 1. crear el contexto global
export const ChatContext = createContext()

// 2 Provider
export const chatProvider = ({ children }) => {
  return (
    <ChatContext.Provider value={{ }}>
      {children}
    </ChatContext.Provider>
  )
}
