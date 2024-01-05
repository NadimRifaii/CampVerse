import './landing-page.styles.css'
import Logo from '../../assets/logo.component'
import { Button } from '../../components/common/button/button.component'
import { useNavigate } from 'react-router-dom'
import LandingImage from '../../assets/landing-image.component'
export const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="left">
          <div className="logo">
            <Logo />
          </div>
          <h1 className="title">CampVerse</h1>
          <p>
            Welcome to CampVerse <span>Your Bootcamp Companion!</span>
          </p>
          <p>
            Streamlining your bootcamp journey for an enhanced learning experience
          </p>
          <div className="btn-holder">
            <Button text='Continue to CampVerse' handleClick={() => navigate("/auth")} />
          </div>
        </div>
        <div className="right">
          <div className="image-holder">
            <LandingImage />
          </div>
        </div>
      </div>
    </div>
  )
}