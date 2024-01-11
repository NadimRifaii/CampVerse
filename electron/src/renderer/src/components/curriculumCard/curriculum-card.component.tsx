import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
type CurriculumCardType = {

}
const CurriculumCard = () => {
  return (
    <div className="curiculum-card">
      <div className="title">
        <InputLabel info={{ type: 'text', label: "Curriculum title", value: '', name: '' }} />
      </div>
      <div className="inputs-container">
        <InputLabel info={{ type: 'text', label: "Stack name", value: "", name: '' }} />
      </div>
      <div className="add-btn">
        <Button text="Add a stack" />
      </div>
    </div>
  )
}
export default CurriculumCard