import { useEffect, useState } from "react";
import { FaFile } from 'react-icons/fa';
import useLogic from "./logic.hook";
import Datetime from 'react-datetime';
import toast from "react-hot-toast";
import './submit-modal.styles.css';
import StyledDropzone from "../dropZone/drop-zone.component";
import { Button } from "../common/button/button.component";
import FilesContainer from "../filesContainer/files-container.component";

const SubmitModal = () => {
  const { assignment, uploadedFiles, setUploadedFiles, submitAssignment } = useLogic();
  const [dueDate, setDueDate] = useState(new Date(assignment.dueDate));
  return (
    <div className={`submission-container`}>
      <div className="assignment-info">
        <div className="title">
          <input type='text' value={assignment.assignmentTitle} disabled />
        </div>
        <div className="due-date">
          <Datetime value={dueDate} onChange={(e) => { setDueDate(new Date(assignment.dueDate)) }} />
        </div>
        <div className="stack-name">
          <input type="text" value={assignment.stackName} disabled />
        </div>
      </div>
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
      <div className="assignment-files">
        <h2>Click to download the assignment files</h2>
        <FilesContainer files={assignment.assignmentFiles} />
      </div>
      <div className="files-container">
        <StyledDropzone assignmentTitle={assignment.assignmentTitle} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      </div>
      <div className="create-assignment-btn">
        <Button text='Submit' handleClick={submitAssignment} />
      </div>
    </div>
  );
};

export default SubmitModal;
