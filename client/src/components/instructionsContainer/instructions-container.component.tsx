type Instruction = {
  instructionTitle: string,
  content: string,
}
type InstructionsContainerProps = {
  instructions: Instruction[],
  disabled?: boolean,
  updateInstructionTitle?: (index: number, value: string) => void,
  updateInstructionContent?: (index: number, value: string) => void
}
const InstructionsContainer = ({ instructions, disabled = true, updateInstructionContent, updateInstructionTitle }: InstructionsContainerProps) => {
  return (
    <div className="instructions">
      {instructions.map((instruction, index) => (
        <div key={index} className="instruction">
          <div className="title">
            {
              disabled ? <input disabled type="text" value={instruction.instructionTitle} placeholder='Instruction title' />
                : <input type="text" value={instruction.instructionTitle} onChange={(e) => {
                  if (updateInstructionTitle)
                    updateInstructionTitle(index, e.target.value)
                }} placeholder='Instruction title' />
            }
          </div>
          <div className="instruction-content">
            {
              disabled ? <textarea disabled value={instruction.content} placeholder='Instruction' ></textarea> :
                <textarea value={instruction.content} placeholder='Instruction' onChange={(e) => {
                  if (updateInstructionContent)
                    updateInstructionContent(index, e.target.value)
                }} ></textarea>
            }
          </div>
        </div>
      ))}
    </div>
  )
}
export default InstructionsContainer