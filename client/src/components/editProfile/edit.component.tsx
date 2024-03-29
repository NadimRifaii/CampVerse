import React, { useContext, useState } from 'react';
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context';
import './edit.styles.css';
import useLogic from './logic.hook';
import { InputLabel } from '../common/inputLabel/input-label.component';
import { Button } from '../common/button/button.component';

const EditProfile = () => {
  const activeEditContext = useContext(ActiveEditContext);
  const { handleFileChange, previewImage, fields, resetCredentials, updateProfile } = useLogic()
  const { active, setActive } = activeEditContext || {};

  return (
    <div className={`edit-container ${active ? 'active' : ''}`}>
      <form onSubmit={(e) => {
        e.preventDefault();
        updateProfile()
        if (setActive)
          setActive(false)
      }} >
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
        <div className="inputs-container">
          {
            fields.map(field => {
              return <InputLabel info={field} key={field.name} />
            })
          }
        </div>
        <div className="buttons-container">
          <Button text="Cancel" className='cancle-btn' handleClick={() => {
            resetCredentials()
            if (setActive)
              setActive(false)
          }} />
          <Button text="Save" className='save-btn' />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
