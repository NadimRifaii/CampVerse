import './input-label.styles.css'
type InputProps = {
  type: string,
  label: string
}
export const InputLabel = ({ type, label }: InputProps) => {
  return (
    <div className="input-label">
      <input type={type} />
      <label htmlFor="">{label}</label>
    </div>
  )
}