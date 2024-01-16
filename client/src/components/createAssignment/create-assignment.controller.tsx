import Datetime from 'react-datetime'
import useLogic from "./logic.hook"
import { useCallback, useEffect } from 'react'
import 'react-datetime/css/react-datetime.css';
import StyledDropzone from '../dropZone/drop-zone.component';
import './create-assignment.styles.css'
const CreateAssignment = () => {
  const { user, currentDate, uploadedFiles, assignmentTitle, instructions, setAssignmentTitle, setUploadedFiles, setInstructions, updateInstructionContent, updateInstructionTitle } = useLogic()
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div className="create-assignment-container">
      <div className="assignment-info">
        <div className="title">
          <input type='text' value={assignmentTitle} onChange={(e) => {
            setAssignmentTitle(e.target.value)
          }} placeholder='Assignment title' />
        </div>
        <div className="due-date">
          <Datetime value={currentDate} inputProps={{ placeholder: 'Select Due date' }} />
        </div>
        <div className="mentor-name">
          <input type="text" disabled value={user.username} />
        </div>
      </div>
      <div className="instructions">
        {
          instructions.map((instruction, index) => {
            return (
              <div className="instruction">
                <div className="title">
                  <input type="text" onChange={(e) => updateInstructionTitle(index, e.target.value)} value={instruction.content} placeholder='Instruction title' />
                </div>
                <div className="instruction-content">
                  <textarea value={instruction.instructionTitle} onChange={(e) => updateInstructionContent(index, e.target.value)} placeholder='Instruction' ></textarea>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="files-container">
        <StyledDropzone assignmentTitle={assignmentTitle} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      </div>
    </div>
  )
}
export default CreateAssignment