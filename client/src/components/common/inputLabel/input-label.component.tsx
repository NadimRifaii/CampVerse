import './input-label.styles.css'
type InputProps = {
  info: {
    type: string,
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  },
  label: string,
  className?: string,
}
export const InputLabel = ({ info, label, className }: InputProps) => {
  const minLength = info.type === 'password' ? 6 : undefined;
  return (
    <div className={`input-label ${className ? className : ''}`}>
      <input {...info} />
      <label className={`${info.value ? 'active' : ''}`} htmlFor="">{label}</label>
    </div>
  )
}