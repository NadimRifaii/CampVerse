import { useEffect, useRef, useState } from 'react'
import { schedulesDataSource } from '../../core/datasource/remoteDataSource/schedules'
import { extractSchedulesSlice, setSchedules } from '../../core/datasource/localDataSource/schedules/schedulesSlice'
import { extractcurrentBootcampSlice } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice'
import { useSelector, useDispatch } from 'react-redux'
import toast from "react-hot-toast";
const useLogic = () => {
  const calendarRef = useRef(null)
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
    if (schedules.length > 0) {
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
    }
  };
  useEffect(() => {
    fetchBootcampSchedules()
  }, [])
  useEffect(() => {
    if (schedules)
      displayEvents()
  }, [schedules])
  const onEventAdded = event => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEventSources();
    const { title, start, end, description: { mentors, users } } = event
    const updatedEvents = [...events, { title, start, end, mentors, users }];
    setEvents(updatedEvents);
    calendarApi.addEventSource(updatedEvents);
  }
  return { onEventAdded, events, calendarRef }
}
export default useLogic