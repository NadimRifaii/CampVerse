import Modal from 'react-modal';
import Datetime from 'react-datetime';
import { useState, useEffect } from 'react';
import { Button } from '../common/button/button.component';
import MentorsList from '../mentorsList/mentors-list.component';
const AddEventModal = ({ onEventAdded, hideModal }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mentorsListOpen, setMentorsListOpen] = useState(false)
  const [description, setDescription] = useState({
    mentors: '',
    users: []
  })
  const onSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title,
      start: new Date(startDate),
      end: new Date(endDate),
      description: description
    };
    onEventAdded(newEvent);
    hideModal(false)
  };
  return (
    <div className="add-model">
      {
        mentorsListOpen &&
        <MentorsList setMentorsListOpen={setMentorsListOpen} setDescription={setDescription} description={description} />
      }
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
          <input onFocus={() => {
            setMentorsListOpen(true)
          }} required type="text" placeholder='Instructors' value={description.mentors} onChange={(e) => {
            setDescription(e.target.value)
          }} />
        </div>
        <div className="btn-container">
          <Button text='Save' type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddEventModal;