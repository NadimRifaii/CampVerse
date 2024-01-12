import { Button } from '../common/button/button.component'
import { InputLabel } from '../common/inputLabel/input-label.component'
import CurriculumCard from '../curriculumCard/curriculum-card.component'
import useLogic from './logic.hook'
import './overview.styles.css'
const Overview = () => {
  const { stacksArray, curriculums, currentCurriculum, addNewStack, updateStack, currentCurriculumChangeHandler, saveCurriculum } = useLogic();
  return (
    <div className="overview">
      <div className="curriculum-cards-container">
        <div className="curiculum-card">
          <div className="title">
            <InputLabel info={{ type: 'text', label: "Curriculum title", name: "Current Curriculum", value: currentCurriculum, onChange: currentCurriculumChangeHandler }} />
          </div>
          <div className="inputs-container">
            {
              stacksArray.map((stack, index) => {
                return <InputLabel key={index} info={{
                  label: 'Stack title',
                  type: 'text', value: stack.name, name: `${index}`, onChange: (e) => {
                    updateStack(index, e.target.value)
                  }
                }} />
              })
            }
          </div>
          <div className="buttons-container">
            <Button text="+ Add a stack" className='add-btn' handleClick={addNewStack} />
            <Button text="Save" handleClick={saveCurriculum} className='save-btn' />
          </div>
        </div>

        {
          curriculums.map((curriculum, index) => <CurriculumCard key={index} curriculum={curriculum} />)
        }
      </div>
    </div>
  )
}
export default Overview