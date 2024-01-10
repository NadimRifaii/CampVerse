import './button.styles.css'
type ButtonProps = {
  text: string,
  type?: string
  className?: string
  handleClick?: () => void
}
export const Button = ({ text, className, handleClick }: ButtonProps) => {
  return (
    <button className={className} onClick={handleClick}> {text} </button>
  )
}