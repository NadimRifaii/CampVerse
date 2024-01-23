import { createContext, useState } from 'react'
import { User } from '../../core/types/user'
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
    id: 0,
    UserId: 0,
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