import { useEffect, useRef, useState } from 'react'
import { schedulesDataSource } from '../../core/datasource/remoteDataSource/schedules'
import { extractSchedulesSlice, setSchedules } from '../../core/datasource/localDataSource/schedules/schedulesSlice'
import { extractcurrentBootcampSlice } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice'
import { useSelector, useDispatch } from 'react-redux'
const useLogic = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const calendarRef = useRef(null)
  const [sessions, setSessions] = useState([])
  const [events, setEvents] = useState([])
  const { schedules } = useSelector(extractSchedulesSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const dispatch = useDispatch()
  const fetchBootcampSchedules = async () => {
    try {
      const id = currentBootcamp.id
      const data = await schedulesDataSource.getBootcampSchedules({ id })
      dispatch(setSchedules(data.schedules))
    } catch (error) {
      console.log(error)
    }
  }
  const displayEvents = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEventSources();
    const newEvents = schedules.flatMap(schedule =>
      schedule.sessions.map(event => {
        const { startDate: start, endDate: end, title, User } = event;
        const obj = {
          start: new Date(start),
          end: new Date(end),
          title,
          mentors: User.map(user => user.username).join(",")
        };
        return obj;
      })
    );
    setEvents(newEvents);
    calendarApi.addEventSource(newEvents);
  };
  useEffect(() => {
    fetchBootcampSchedules()
  }, [])
  useEffect(() => {
    console.log(sessions)
  }, [sessions])
  useEffect(() => {
    displayEvents()
  }, [schedules])
  const onEventAdded = event => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEventSources();
    const { title, start, end, description: { mentors, users } } = event
    const updatedEvents = [...events, { title, start, end, mentors, users }];
    setSessions([...sessions, { start, end, title, users }])
    setEvents(updatedEvents);
    calendarApi.addEventSource(updatedEvents);
  }
  return { modalOpen, setModalOpen, onEventAdded, events, sessions, calendarRef }
}
export default useLogic