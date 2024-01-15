import Modal from 'react-modal';
import Datetime from 'react-datetime';
import { useState, useEffect } from 'react';
import { Button } from '../common/button/button.component';

const AddEventModal = ({ onEventAdded, setModalOpen }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('')
  const onSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title,
      start: new Date(startDate),
      end: new Date(endDate),
      description: description
    };

    onEventAdded(newEvent);
    setModalOpen(false)
  };

  return (
    <div className="add-model">
      <form onSubmit={onSubmit}>
        <div className="title">
          <input type="text" required placeholder='Enter event title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="start-date">
          <label htmlFor="">Start date</label>
          <Datetime required value={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div className="end-date">
          <label htmlFor="">End date</label>
          <Datetime required value={endDate} onChange={(date) => setEndDate(date)} />
        </div>
        <div className="description">
          <label htmlFor="">Description</label>
          <input required type="text" placeholder='Instructor' value={description} onChange={(e) => {
            setDescription(e.target.value)
          }} />
        </div>
        <div className="btn-container">
          <Button text='Save' type="submit" handleClick={() => {

          }
          } />
        </div>
      </form>
    </div>
  );
};

export default AddEventModal;