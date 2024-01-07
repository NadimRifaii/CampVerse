import { createContext, useState } from 'react'

type ActiveFormContextProviderProps = {
  children: React.ReactNode
}

type ActiveFormContextType = {
  active: null | string,
  setActive: React.Dispatch<React.SetStateAction<string | null>>
}
export const ActiveFormContext = createContext<null | ActiveFormContextType>({} as ActiveFormContextType)


export const ActiveFormContextProvider = ({ children }: ActiveFormContextProviderProps) => {
  const [active, setActive] = useState<string | null>(null)
  return (
    <ActiveFormContext.Provider value={{ active, setActive }} >{children}</ActiveFormContext.Provider>
  )
}