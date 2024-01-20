const InstructionsContainer = ({ instructions, disabled }) => {
  return (
    <div className="instructions">
      {instructions.map((instruction, index) => (
        <div key={index} className="instruction">
          <div className="title">
            {
              disabled ? <input disabled type="text" value={instruction.instructionTitle} placeholder='Instruction title' />
                : <input type="text" value={instruction.instructionTitle} placeholder='Instruction title' />
            }
          </div>
          <div className="instruction-content">
            {
              disabled ? <textarea disabled value={instruction.content} placeholder='Instruction' ></textarea> :
                <textarea value={instruction.content} placeholder='Instruction' ></textarea>
            }
          </div>
        </div>
      ))}
    </div>
  )
}
export default InstructionsContainer