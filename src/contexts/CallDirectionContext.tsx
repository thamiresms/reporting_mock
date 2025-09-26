'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type CallDirection = 'inbound' | 'outbound'

interface CallDirectionContextType {
  callDirection: CallDirection
  setCallDirection: (direction: CallDirection) => void
}

const CallDirectionContext = createContext<CallDirectionContextType | undefined>(undefined)

interface CallDirectionProviderProps {
  children: ReactNode
}

export function CallDirectionProvider({ children }: CallDirectionProviderProps) {
  const [callDirection, setCallDirection] = useState<CallDirection>('inbound')

  return (
    <CallDirectionContext.Provider value={{ callDirection, setCallDirection }}>
      {children}
    </CallDirectionContext.Provider>
  )
}

export function useCallDirection() {
  const context = useContext(CallDirectionContext)
  if (context === undefined) {
    throw new Error('useCallDirection must be used within a CallDirectionProvider')
  }
  return context
}
