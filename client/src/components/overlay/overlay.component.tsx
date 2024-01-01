import { Button } from '../common/button/button.component'
import './overlay.styles.css'
import { useContext } from 'react'
import { ActiveFormContext } from '../../contexts/active-form.context'
export const Overlay = () => {
  const activeFormContext = useContext(ActiveFormContext)
  if (!activeFormContext) {
    return <h1>activeContext not found</h1>
  }
  const { setActive } = activeFormContext
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-left">
          <h1>Wellcome back</h1>
          <p>Login with your personal info</p>
          <Button text='Login' className="switch" handleClick={() => setActive("")} />
        </div>
        <div className="overlay-right">
          <h1>Hello</h1>
          <p>Enter your personal details and start your journey</p>
          <Button text='Signup' className="switch" handleClick={() => setActive("right-panel-active")} />
        </div>
      </div>
    </div>
  )
}