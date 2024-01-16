import React, { useMemo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileImage, FaFile } from 'react-icons/fa';
import axios from 'axios';
import './drop-zone.styles.css';
import { userDataSource } from '../../core/datasource/remoteDataSource/user';
import toast from "react-hot-toast";
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function StyledDropzone(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop: async (newFiles) => {
      const validFiles = newFiles.filter(file => (
        file.type === 'application/pdf' || file.type === 'text/plain'
      ));

      const combinedFiles = [...uploadedFiles, ...validFiles];
      setUploadedFiles(combinedFiles);
      console.log('Accepted Files:', combinedFiles);
      validFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await userDataSource.uploadFile(formData);
          console.log('File uploaded to server:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      });
    },
    accept: ['.pdf', 'text/plain'],
    multiple: true, // Allow multiple files
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const renderFiles = useCallback(() => {
    return uploadedFiles.map((file, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        {file.type.startsWith('image/') ? (
          <FaFileImage style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        ) : (
          <FaFile style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        )}
        <p>{file.name}</p>
      </div>
    ));
  }, [uploadedFiles]);

  return (
    <div className="container-dropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {uploadedFiles.length > 0 && (
        <div style={{ display: 'inline-flex', flexDirection: 'row', marginTop: '10px', gap: '10px', padding: '10px' }}>
          <p>Uploaded Files:</p>
          {renderFiles()}
        </div>
      )}
    </div>
  );
}

export default StyledDropzone;
