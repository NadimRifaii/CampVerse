import Datetime from 'react-datetime'
import useLogic from "./logic.hook"
import { useCallback, useEffect } from 'react'
import 'react-datetime/css/react-datetime.css';
import { useDropzone } from 'react-dropzone';
import StyledDropzone from '../dropZone/drop-zone.component';
const CreateAssignment = () => {
  const { user, currentDate } = useLogic()
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div className="create-assignment-container">
      <div className="assignment-info">
        <div className="title">
          <input type='text' placeholder='Assignment title' />
        </div>
        <div className="due-date">
          <Datetime value={currentDate} />
        </div>
        <div className="mentor-name">
          <input type="text" disabled value={user.username} />
        </div>
        <div className="files-container">
          <StyledDropzone />
        </div>
      </div>
    </div>
  )
}
export default CreateAssignment