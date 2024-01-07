import React, { useContext, useState } from 'react';
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context';
import './edit.styles.css';
import useLogic from './logic.hook';

const EditProfile = () => {
  const activeEditContext = useContext(ActiveEditContext);
  const { handleFileChange, previewImage, selectedFile } = useLogic()
  if (!activeEditContext) {
    return <h1>activeEditContext not found</h1>;
  }

  const { active } = activeEditContext;
  return (
    <div className={`edit-container ${active ? 'active' : ''}`}>
      <form>
        <div className="top">
          <input
            type="file"
            onChange={handleFileChange}
            name="file"
            id="fileInput"
            accept="image/*"
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
            // src attribute expects a URL, data URL
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
