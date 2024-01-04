import ResultsIcon from "../../assets/users-icon.component"
type SidebarItemProps = {
  icon: React.ReactNode; // Type for React components
  text: string;
}
const SidebarItem = ({ icon, text }: SidebarItemProps) => {
  return (
    <div className="sidebar-item">
      <div className="icon">
        {icon}
      </div>
      <div className="text">
        Results
      </div>
    </div>
  )
}
export default SidebarItem