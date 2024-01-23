import React, { useMemo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileImage, FaFile } from 'react-icons/fa';
import { userDataSource } from '../../core/datasource/remoteDataSource/user';
import toast from 'react-hot-toast';

import './drop-zone.styles.css';

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
  const { uploadedFiles, setUploadedFiles, fileUrl, assignmentTitle } = props;

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop: async (newFiles) => {
      if (!assignmentTitle.trim()) {
        toast.error('Assignment title cannot be empty');
        return;
      }
      const validFiles = newFiles.filter(file => {
        const acceptedExtensions = ['txt', 'css', 'js', 'html'];
        const fileExtension = file.name.split('.').pop();
        return acceptedExtensions.includes(fileExtension.toLowerCase());
      });

      if (validFiles.length === 0) {
        toast.error('Invalid file format. Please upload txt, css, js, or html files.');
        return;
      }


      const updatedFiles = validFiles.map((file) => ({
        fileName: file.name,
        fileType: file.type.split('/')[1],
        fileUrl,
      }));

      const combinedFiles = [...uploadedFiles, ...updatedFiles];
      setUploadedFiles(combinedFiles);
      validFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await userDataSource.uploadFile({
            formData,
            name: fileUrl,
          });
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      });
    },
    multiple: true,
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
        {file.fileType.startsWith('image/') ? (
          <FaFileImage style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        ) : (
          <FaFile style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        )}
        <p>{file.fileName}</p>
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
        <div style={{ display: 'inline-flex', flexDirection: 'row', marginTop: '10px', gap: '10px', padding: '10px', flexWrap: 'wrap' }}>
          {renderFiles()}
        </div>
      )}
    </div>
  );
}

export default StyledDropzone;
