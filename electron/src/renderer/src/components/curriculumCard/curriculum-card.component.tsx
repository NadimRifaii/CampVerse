import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
type Stack = {
  name: string
}
type CurriculumType = {
  title: string,
  stacks: Stack[]
}
type CurriculumCardPropsType = {
  curriculum: CurriculumType
}
const CurriculumCard = ({ curriculum }: CurriculumCardPropsType) => {

  return (
    <div className="curiculum-card">
      <div className="title">
        <h2>{curriculum.title}</h2>
      </div>
      <div className="inputs-container">
        {
          curriculum.stacks.map((stack, index) => {
            return <InputLabel key={index} info={{
              label: '',
              type: 'text', value: stack.name, name: `${index}`, disabled: true
            }} />
          })
        }
      </div>
    </div>
  )
}
export default CurriculumCard