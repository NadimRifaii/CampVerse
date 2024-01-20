import { Outlet } from "react-router-dom"
import EditProfile from "../../components/editProfile/edit.component"
import Header from "../../components/header/header.component"
import { SideBar } from "../../components/sidebar/sidebar.component"
import './home-page.styles.css'
import Bootcamps from "../../components/bootcamps/bootcamps.component"
const HomePage = () => {
  return (
    <div className="homepage">
      <SideBar homepage={true} />
      <div className="content">
        <Header />
        <Bootcamps />
        <EditProfile />
        <Outlet />
      </div>
    </div>
  )
}
export default HomePage