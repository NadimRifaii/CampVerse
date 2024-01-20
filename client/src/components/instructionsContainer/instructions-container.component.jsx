const InstructionsContainer = () => {
  return (
    <div className="instructions">
      {assignment.instructions.map((instruction, index) => (
        <div key={index} className="instruction">
          <div className="title">
            <input disabled type="text" value={instruction.instructionTitle} placeholder='Instruction title' />
          </div>
          <div className="instruction-content">
            <textarea disabled value={instruction.content} placeholder='Instruction' ></textarea>
          </div>
        </div>
      ))}
    </div>
  )
}
export default InstructionsContainer