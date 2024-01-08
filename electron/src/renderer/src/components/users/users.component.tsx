import './users.styles.css'
const Users = () => {
  return (
    <div className="users-container">
      <div className="search-bar">
        <input type="search" placeholder="Search..." />
        <img src={`http://localhost:8000/images/search.png`} alt="" />
      </div>
    </div>
  )
}
export default Users