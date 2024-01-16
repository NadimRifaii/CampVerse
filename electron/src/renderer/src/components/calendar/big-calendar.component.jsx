import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import AddEventModal from '../addEventModal/add-event.component'
import { Button } from '../common/button/button.component'
import './calendar.styles.css'
import useLogic from './logic.hook'

const Calendar = () => {
  const { modalOpen, setModalOpen, calendarRef, events, sessions, onEventAdded } = useLogic()
  return (
    <section>
      <Button text='Add event' handleClick={() => setModalOpen(!modalOpen)} />
      <div className='calendar-holder' style={{ position: 'relative', zIndex: 0, height: 700 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
          eventContent={(info) => (
            <div>
              <p>{info.event.title}</p>
              <p>{new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>{info.event.extendedProps.mentors}</p>
            </div>
          )}
          initialView='timeGridWeek'
          slotMinTime='10:00:00'
          slotMaxTime='21:00:00'
        />
      </div>
      {
        modalOpen && <AddEventModal hideModal={setModalOpen} onEventAdded={onEventAdded} />
      }
    </section>
  )
}

export default Calendar
