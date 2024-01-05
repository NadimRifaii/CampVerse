import ResultsIcon from "../../assets/users-icon.component"
type SidebarItemProps = {
  icon: React.ReactNode; // Type for React components
  text: string;
  handleClick: () => void;
  isActive: boolean
}
const SidebarItem = ({ icon, text, handleClick, isActive }: SidebarItemProps) => {
  return (
    <div className={`sidebar-item ${isActive ? "active" : ""}`} onClick={handleClick}>
      <div className="icon">
        {icon}
      </div>
      <div className="text">
        {text}
      </div>
    </div>
  )
}
export default SidebarItem