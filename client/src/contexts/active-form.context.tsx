import { createContext, useState } from 'react'

type UserContextProviderProps = {
  children: React.ReactNode
}

type ActiveContextType = {
  active: null | string,
  setActive: React.Dispatch<React.SetStateAction<string | null>>
}
export const ActiveContext = createContext<null | ActiveContextType>({} as ActiveContextType)


export const ActiveContextProvider = ({ children }: UserContextProviderProps) => {
  const [active, setActive] = useState<string | null>(null)
  return (
    <ActiveContext.Provider value={{ active, setActive }} >{children}</ActiveContext.Provider>
  )
}