import { createContext, useState } from 'react'
type ActiveEditContextProviderProps = {
  children: React.ReactNode
}
type ActiveEditContextType = {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}
export const ActiveEditContext = createContext<null | ActiveEditContextType>({} as ActiveEditContextType)

export const ActiveEditContextProvider = ({ children }: ActiveEditContextProviderProps) => {
  const [active, setActive] = useState<boolean>(false)
  console.log(`Hello world`)
  return (
    <ActiveEditContext.Provider value={{ active, setActive }}>{children}</ActiveEditContext.Provider>
  )
}