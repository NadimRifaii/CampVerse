import './bootcamp.styles.css'
type BootcampProps = {
  name: string
}
const Bootcamp = ({ name }: BootcampProps) => {
  return (
    <div className="bootcamp">
      <div className="image-holder">
        <img src={`http://localhost:8000/images/Subtract.png`} alt="" />
      </div>
      <div className="name">{name}</div>
    </div>
  )
}
export default Bootcamp