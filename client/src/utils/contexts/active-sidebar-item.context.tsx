import { createContext, useState } from 'react'
import { local } from '../../core/helpers/localStorage'
type ActiveSidebarItemProviderProps = {
  children: React.ReactNode
}
type ActiveSidebarItemContextType = {
  activeItem: string,
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}
export const ActiveSidebarItemContext = createContext<ActiveSidebarItemContextType>({} as ActiveSidebarItemContextType)

export const ActiveSidebarItemContextProvider = ({ children }: ActiveSidebarItemProviderProps) => {
  const [activeItem, setActiveItem] = useState<string>(`${local("activeItem") ? local("activeItem") : "Bootcamps"}`)
  return <ActiveSidebarItemContext.Provider value={{ activeItem, setActiveItem }} >{children}</ActiveSidebarItemContext.Provider>
}