import { Button } from '../common/button/button.component'
import { InputLabel } from '../common/inputLabel/input-label.component'
import CurriculumCard from '../curriculumCard/curriculum-card.component'
import useLogic from './logic.hook'
import Select from 'react-select'
import './overview.styles.css'
const Overview = () => {
  const { stacksArray, curriculums, currentCurriculum, activeAddModal, currentBootcamp, currentWeek, setCurrentWeek, setActiveAddModal, addNewStack, updateStack, currentCurriculumChangeHandler, saveCurriculum } = useLogic();
  return (
    <div className="overview">
      <div className={`curriculum-cards-container ${activeAddModal ? 'active' : ''} `}>
        <div className={`add-curriculum-card ${activeAddModal ? 'active' : ''} `}>
          <div className="select-box">
            <Select
              onChange={(value) => {
                setCurrentWeek(value?.value || 1)
              }}
              options={currentBootcamp?.weeks.map((week, index: number) => ({
                value: week.ID,
                label: `Week ${index + 1}`,
              }))}
              defaultValue={{
                value: currentWeek,
                label: `Week ${currentWeek}`,
              }}
            />
          </div>
          <div className="title">
            <InputLabel info={{ type: 'text', label: "Module title", name: "Current Curriculum", value: currentCurriculum, onChange: currentCurriculumChangeHandler }} />
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
            <Button text="Save" handleClick={() => {
              saveCurriculum()
              setActiveAddModal(false)
            }} className='save-btn' />
          </div>
        </div>

        {
          curriculums.map((curriculum, index) => <CurriculumCard key={index} curriculum={curriculum} />)
        }
        <div className="add-curriculum-btn">
          <Button text='Add Module' handleClick={() => {
            setActiveAddModal(true)
          }} />
        </div>
      </div>
    </div>
  )
}
export default Overview