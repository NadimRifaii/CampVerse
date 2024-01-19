import { FaFile } from 'react-icons/fa';
const FilesContainer = ({ file, title }) => {
  return (
    <div className="file" key={index}>
      <a href={`http://localhost:8000/assignment/download?substring=${assignment.assignmentTitle}`}>
        <FaFile style={{ width: '30px', height: '30px', marginRight: '10px' }} />
      </a>
      <p className="file-name">{file.fileUrl}</p>
    </div>
  )
}
export default FilesContainer