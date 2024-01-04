import './home-page.styles.css'
import Landing1 from '../../assets/Landing1'
import Landing2 from '../../assets/Landing2'
import Logo from '../../assets/Logo'
import { Button } from '../../components/common/button/button.component'
import { useNavigate } from 'react-router-dom'
import Landing3 from '../../assets/Landing3'
import Landing4 from '../../assets/Landing4'
import Landing5 from '../../assets/Landing5'
export const HomePage = () => {
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
            <Landing2 />
          </div>
        </div>
      </div>
    </div>
  )
}