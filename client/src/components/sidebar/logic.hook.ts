import { useState } from "react"

const useLogic = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false)
  return { sidebarActive, setSidebarActive }
}
export default useLogic