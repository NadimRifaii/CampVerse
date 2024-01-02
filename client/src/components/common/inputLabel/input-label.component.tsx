import './input-label.styles.css'
type InputProps = {
  type: string,
  label: string,
  name: string,
  value: string,
  className?: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const InputLabel = ({ type, className, label, name, value, handleChange }: InputProps) => {
  const minLength = type === 'password' ? 6 : undefined;
  return (
    <div className={`input-label ${className}`}>
      <input type={type} name={name} minLength={minLength} value={value} required onChange={handleChange} />
      <label className={`${value ? 'active' : ''}`} htmlFor="">{label}</label>
    </div>
  )
}