import { createContext, useState } from 'react'
type NotificationsContextProviderProps = {
  children: React.ReactNode
}
type NotificationsContextType = {
  notifications: any[],
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>
}
export const NotificationsContext = createContext<NotificationsContextType>({} as NotificationsContextType)

export const NotificationsContextProvider = ({ children }: NotificationsContextProviderProps) => {
  const [notifications, setNotifications] = useState<any[]>([])
  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationsContext.Provider>
  )
}