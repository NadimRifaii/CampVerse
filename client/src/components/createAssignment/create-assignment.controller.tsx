import Datetime from 'react-datetime'
import useLogic, { CurriculumType } from "./logic.hook"
import { useCallback, useEffect, useState } from 'react'
import 'react-datetime/css/react-datetime.css';
import StyledDropzone from '../dropZone/drop-zone.component';
import { useNavigate } from 'react-router-dom';
import './create-assignment.styles.css'
import { Button } from '../common/button/button.component';
import InstructionsContainer from '../instructionsContainer/instructions-container.component';
type CreateAssignmentProps = {
  fetchBootcampAssignments: () => Promise<void>
}
const CreateAssignment = ({ fetchBootcampAssignments }: CreateAssignmentProps) => {
  const [stacksListOpen, setStacksListOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user, dueDate, uploadedFiles, assignmentTitle, instructions, stackName, bootcampStacks, setStackName, createAssignment, setDueDate, setAssignmentTitle, setUploadedFiles, setInstructions, updateInstructionContent, updateInstructionTitle } = useLogic()
  useEffect(() => {
    if (user.role == "student")
      navigate('/home')
  }, [])
  return (
    <div className="create-assignment-container">
      <h2>Create Assignment</h2>

      <div className="assignment-info">
        <div className="title">
          <input type='text' value={assignmentTitle} onChange={(e) => {
            setAssignmentTitle(e.target.value)
          }} placeholder='Assignment title' />
        </div>
        <div className="due-date">
          <Datetime value={dueDate} onChange={(date) => setDueDate(date)} inputProps={{ placeholder: 'Select Due date' }} />
        </div>
        <div className="stack-name">
          <input type="text" value={stackName} placeholder='Stack name' onChange={(e) => {
          }} onFocus={() => setStacksListOpen(true)} />
        </div>
      </div>
      <div className="stacks-list">
        {
          stacksListOpen && bootcampStacks.map((stack, index) => {
            return <div className="stack" key={index} onClick={(e) => {
              setStackName(stack)
              setStacksListOpen(false)
            }} >
              <p>{stack}</p>
            </div>
          })
        }
      </div>
      <InstructionsContainer updateInstructionTitle={updateInstructionTitle} updateInstructionContent={updateInstructionContent} instructions={instructions} disabled={false} />
      {/* <div className="add-instruction-btn">
        <Button text='Add' handleClick={() => {
          if (instructions[instructions.length - 1].content != "" && instructions[instructions.length - 1].instructionTitle != "")
            setInstructions([...instructions, {
              instructionTitle: "",
              content: ''
            }])
        }} />
      </div> */}
      <div className="files-container">
        <StyledDropzone assignmentTitle={assignmentTitle} fileUrl={`${user.email.split('@')[0]}-assignment-${assignmentTitle}`} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      </div>
      <div className="create-assignment-btn">
        <Button text='Create' handleClick={async () => {
          await createAssignment()
          await fetchBootcampAssignments()
        }} />
      </div>
    </div>
  )
}
export default CreateAssignment