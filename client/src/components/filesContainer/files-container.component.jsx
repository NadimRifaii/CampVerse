import { useEffect } from 'react';
import { FaFile } from 'react-icons/fa';
const FilesContainer = ({ files }) => {
  useEffect(() => {
    console.log(files)
  }, [files])
  return (
    <div className="files-container">
      {files?.map((file, index) => {
        return (
          <div className="file" key={index}>
            <a href={`http://localhost:8000/assignment/download?substring=${file.fileName}`}>
              <FaFile style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            </a>
            <p className="file-name">{file.fileUrl}</p>
          </div>
        )
      })}
    </div>
  )
}
export default FilesContainer