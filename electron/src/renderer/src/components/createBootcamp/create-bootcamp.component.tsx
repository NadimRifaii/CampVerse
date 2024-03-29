import { Button } from "../common/button/button.component";
import './create-bootcamp.styles.css'
import 'react-datepicker/dist/react-datepicker.css';
import useLogic from "./logic.hook";
import { useState } from "react";

const CreateBootcamp = () => {
  const { changeHandler, credentials, resetFields, createBootcamp } = useLogic();

  return (
    <>
      <div className="create-bootcamp">
        <form onSubmit={(e) => {
          e.preventDefault();
          createBootcamp();
        }}>
          <h2>Create bootcamp</h2>
          <div className="inputs-container">
            <div className="holder">
              <input
                type="text"
                required
                value={credentials.name}
                name="name"
                placeholder="Bootcamp name"
                onChange={changeHandler}
              />
            </div>
            <div className="holder">
              <input
                type="date"
                name="startDate"
                required
                onChange={changeHandler}
                id="start-date"
              />
            </div>
            <div className="holder">
              <input
                type="number"
                required
                value={credentials.numberOfWeeks}
                name="numberOfWeeks"
                placeholder="Number of weeks"
                onChange={changeHandler}
              />
            </div>
            <div className="holder">
              <textarea
                required
                name="outcomes"
                value={credentials.outcomes}
                placeholder="Learning outcomes"
                onChange={changeHandler}
              ></textarea>
            </div>
            <div className="holder">
              <textarea
                required
                name="audience"
                value={credentials.audience}
                placeholder="Target audience"
                onChange={changeHandler}
              ></textarea>
            </div>
          </div>
          <div className="buttons-container">
            <Button text="Cancel" className='cancel-btn' handleClick={resetFields} />
            <Button text="Create" className='save-btn' />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBootcamp;
