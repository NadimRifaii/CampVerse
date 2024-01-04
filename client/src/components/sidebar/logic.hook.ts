import { useState } from "react"

const useLogic = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(true)
  return { sidebarActive, setSidebarActive }
}
export default useLogic