import './input-label.styles.css'
type InputProps = {
  info: {
    type: string,
    name: string,
    value: string,
    id?: string,
    label?: string,
    className?: string,
    disabled?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
}
export const InputLabel = ({ info }: InputProps) => {
  const minLength = info.type === 'password' ? 6 : undefined;
  const { className, label, ...inputInfo } = info
  return (
    <div className={`input-label ${className ? className : ''}`}>
      <input {...inputInfo} autoComplete='off' required />
      <label className={`${info.value ? 'active' : ''}`} htmlFor={info.id}>{label}</label>
    </div>
  )
}