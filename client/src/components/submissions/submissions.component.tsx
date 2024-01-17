import { useEffect } from "react"
import useLogic from "./logic.hook"

const Submissions = () => {
  const { submissions } = useLogic()
  useEffect(() => {
    console.log(submissions)
  }, [submissions])
  return (
    <h1>Hello</h1>
  )
}
export default Submissions