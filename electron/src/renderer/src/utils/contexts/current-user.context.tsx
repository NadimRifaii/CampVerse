import { User } from '@renderer/core/types/user'
import { createContext, useState } from 'react'
type CurrentUserContextProviderProps = {
  children: React.ReactNode
}
type CurrentUserContextType = {
  currentUser: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}
export const ActiveEditContext = createContext<null | CurrentUserContextType>({} as CurrentUserContextType)

export const ActiveEditContextProvider = ({ children }: CurrentUserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  return (
    <ActiveEditContext.Provider value={{ currentUser, setCurrentUser }}>{children}</ActiveEditContext.Provider>
  )
}