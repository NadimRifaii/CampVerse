import { Button } from "../common/button/button.component";
import './create-bootcamp.styles.css'
import useLogic from "./logic.hook";
const CreateBootcamp = () => {
  const { changeHandler, credentials, resetFields } = useLogic()
  console.log(credentials)
  return (
    <div className="create-bootcamp" >
      <form onSubmit={(e) => {
        e.preventDefault()
      }} >
        <div className="inputs-container">
          <div className="holder">
            <input type="text" value={credentials.name} name="name" placeholder="Bootcamp name" onChange={changeHandler} />
          </div>
          <div className="holder">
            <textarea name="outcomes" value={credentials.outcomes} placeholder="Learning outcomes" onChange={changeHandler}></textarea>
          </div>
          <div className="holder">
            <textarea name="audience" value={credentials.audience} placeholder="Target audience" onChange={changeHandler}></textarea>
          </div>
        </div>
        <div className="buttons-container">
          <Button text="Cancle" className='cancle-btn' handleClick={resetFields} />
          <Button text="Create" className='save-btn' />
        </div>
      </form>
    </div>
  );
}
export default CreateBootcamp