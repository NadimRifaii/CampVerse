import { createContext, useState } from 'react'
type NotificationsContextProviderProps = {
  children: React.ReactNode
}
type NotificationsContextType = {
  notifications: [],
  setNotifications: React.Dispatch<React.SetStateAction<[]>>
}
export const NotificationsContext = createContext<NotificationsContextType>({} as NotificationsContextType)

export const NotificationsContextProvider = ({ children }: NotificationsContextProviderProps) => {
  const [notifications, setNotifications] = useState<[]>([])
  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationsContext.Provider>
  )
}