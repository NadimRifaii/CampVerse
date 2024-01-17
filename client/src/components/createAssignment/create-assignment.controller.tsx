import Datetime from 'react-datetime'
import useLogic, { CurriculumType } from "./logic.hook"
import { useCallback, useEffect } from 'react'
import 'react-datetime/css/react-datetime.css';
import StyledDropzone from '../dropZone/drop-zone.component';
import './create-assignment.styles.css'
import { Button } from '../common/button/button.component';
const CreateAssignment = () => {
  const { user, dueDate, uploadedFiles, assignmentTitle, instructions, stackName, bootcampStacks, setStackName, createAssignment, setDueDate, setAssignmentTitle, setUploadedFiles, setInstructions, updateInstructionContent, updateInstructionTitle } = useLogic()
  useEffect(() => {
    console.log(bootcampStacks)
  }, [bootcampStacks])
  return (
    <div className="create-assignment-container">
      <div className="assignment-info">
        <div className="title">
          <input type='text' value={assignmentTitle} onChange={(e) => {
            setAssignmentTitle(e.target.value)
          }} placeholder='Assignment title' />
        </div>
        <div className="due-date">
          <Datetime value={dueDate} onChange={() => setDueDate(new Date())} inputProps={{ placeholder: 'Select Due date' }} />
        </div>
        <div className="stack-name">
          <input type="text" value={stackName} placeholder='Stack name' onChange={(e) => {
            setStackName(e.target.value)
          }} />
        </div>
      </div>
      <div className="stacks-list">

      </div>
      <div className="instructions">
        {
          instructions.map((instruction, index) => {
            return (
              <div className="instruction">
                <div className="title">
                  <input type="text" onChange={(e) => updateInstructionTitle(index, e.target.value)} value={instruction.instructionTitle} placeholder='Instruction title' />
                </div>
                <div className="instruction-content">
                  <textarea value={instruction.content} onChange={(e) => updateInstructionContent(index, e.target.value)} placeholder='Instruction' ></textarea>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="add-instruction-btn">
        <Button text='Add' handleClick={() => {
          if (instructions[instructions.length - 1].content != "" && instructions[instructions.length - 1].instructionTitle != "")
            setInstructions([...instructions, {
              instructionTitle: "",
              content: ''
            }])
        }} />
      </div>
      <div className="files-container">
        <StyledDropzone assignmentTitle={assignmentTitle} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      </div>
      <div className="create-assignment-btn">
        <Button text='Create' handleClick={createAssignment} />
      </div>
    </div>
  )
}
export default CreateAssignment