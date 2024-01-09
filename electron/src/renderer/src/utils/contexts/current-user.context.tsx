import { User } from '@renderer/core/types/user'
import { createContext, useState } from 'react'
type CurrentUserContextProviderProps = {
  children: React.ReactNode
}
type CurrentUserContextType = {
  currentUser: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}
export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType)

export const CurrentUserContextProvider = ({ children }: CurrentUserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "student",
    profilePicture: "",
    speciality: "",
    position: ""
  })
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</CurrentUserContext.Provider>
  )
}