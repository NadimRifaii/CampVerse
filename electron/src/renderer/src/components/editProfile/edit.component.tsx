import { useContext } from 'react';
import './edit.styles.css';
import useLogic from './logic.hook';
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context';
import { InputLabel } from '../common/inputLabel/input-label.component';
import { Button } from '../common/button/button.component';

const EditProfile = () => {
  const activeEditContext = useContext(ActiveEditContext);
  const { handleFileChange, previewImage, fields, resetCredentials, updateProfile, role, setRole } = useLogic()
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
        <div className="select-container">
          {
            role != 'admin' ?
              <>
                <label htmlFor="role">Choose user role:</label>
                <select name="role" id="role" value={role} onChange={(e) => {
                  setRole(e.target.value)
                }}>
                  <option value="mentor">Mentor</option>
                  <option value="student">Student</option>
                </select>
              </>
              : ""
          }
        </div>
        <div className="inputs-container">
          {
            fields.map(field => {
              return <InputLabel info={field} key={field.name} />
            })
          }
        </div>
        <div className="buttons-container">
          {/* <Button text="Cancle" className='cancle-btn' handleClick={() => {
            resetCredentials()
            if (setActive)
              setActive(false)
          }} /> */}
          <button onClick={(e) => {
            e.preventDefault()
            resetCredentials()
            if (setActive)
              setActive(false)
          }} >Cancle</button>
          <Button text="Save" className='save-btn' />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
