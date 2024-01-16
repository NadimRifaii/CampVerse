import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import './calendar.styles.css'
import useLogic from './logic.hook'
const Calendar = () => {
  const { calendarRef, events } = useLogic()
  return (
    <section>
      <div className='calendar-holder' style={{ position: 'relative', zIndex: 0, height: 550 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
          eventContent={(info) => (
            <div>
              <p>{info.event.title}</p>
              <p>{new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | {info.event.extendedProps.mentors}</p>
            </div>
          )}
          initialView='timeGridWeek'
          slotMinTime='10:00:00'
          slotMaxTime='21:00:00'
        />
      </div>
    </section>
  )
}

export default Calendar
