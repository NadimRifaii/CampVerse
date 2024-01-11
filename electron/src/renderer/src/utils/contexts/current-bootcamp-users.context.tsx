import { createContext, useState } from 'react'
type CurrentBootcampUsersContextProviderProps = {
  children: React.ReactNode
}
type CurrentBootcampUsersContextType = {
  currentUsers: [],
  setCurrentBootcampUsers: React.Dispatch<React.SetStateAction<[]>>
}
export const ActiveEditContext = createContext<CurrentBootcampUsersContextType>({} as CurrentBootcampUsersContextType)

export const ActiveEditContextProvider = ({ children }: CurrentBootcampUsersContextProviderProps) => {
  const [currentUsers, setCurrentBootcampUsers] = useState<[]>([])
  return (
    <ActiveEditContext.Provider value={{ currentUsers, setCurrentBootcampUsers }}>{children}</ActiveEditContext.Provider>
  )
}