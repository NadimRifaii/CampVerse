import { useEffect } from "react"
import useLogic from "./logic.hook"

const Submissions = () => {
  const { user } = useLogic()
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <h1>Hello</h1>
  )
}
export default Submissions