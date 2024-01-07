import './edit.styles.css'
import { useContext } from 'react'
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context'
const EditProfile = () => {
  const activeEditContext = useContext(ActiveEditContext)
  if (!activeEditContext) {
    return <h1>activeEditContext not found</h1>
  }
  const { active } = activeEditContext
  return (
    <div className={`edit-container ${active ? "active" : ''} `}>
      <form action="">
        <h1>Edit profile</h1>
      </form>
    </div>
  )
}
export default EditProfile