import { createContext, useState } from 'react'

type UserContextProviderProps = {
  children: React.ReactNode
}

type ActiveContextType = {
  active: null | string,
  setActive: React.Dispatch<React.SetStateAction<string | null>>
}
export const ActiveFormContext = createContext<null | ActiveContextType>({} as ActiveContextType)


export const ActiveFormContextProvider = ({ children }: UserContextProviderProps) => {
  const [active, setActive] = useState<string | null>(null)
  return (
    <ActiveFormContext.Provider value={{ active, setActive }} >{children}</ActiveFormContext.Provider>
  )
}