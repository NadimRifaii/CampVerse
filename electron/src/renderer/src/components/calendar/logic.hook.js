import { useEffect, useRef, useState } from 'react'
import { schedulesDataSource } from '../../core/datasource/remoteDataSource/schedules'
import { extractSchedulesSlice, setSchedules } from '../../core/datasource/localDataSource/schedules/schedulesSlice'
import { extractcurrentBootcampSlice } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice'
import { useSelector, useDispatch } from 'react-redux'
import toast from "react-hot-toast";
const useLogic = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const calendarRef = useRef(null)
  const [sessions, setSessions] = useState([])
  const [events, setEvents] = useState([])
  const { schedules } = useSelector(extractSchedulesSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const [bootcampStartDate, setBootcampStartDate] = useState('')
  const [bootcampEndDate, setBootcampEndDate] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    setBootcampEndDate(currentBootcamp.endDate)
    setBootcampStartDate(currentBootcamp.startDate)
  }, [currentBootcamp])
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

  const saveEvents = async () => {
    const loadingToastId = toast.loading('Saving...');
    try {
      if (sessions.length > 0) {
        const response = await schedulesDataSource.setSchedule({
          bootcampId: currentBootcamp.id,
          initialDate: `${new Date()}`,
          sessions
        })
        toast.success('Schedule saved!', { id: loadingToastId });
      } else {
        throw new Error("Sessions were not provided!")
      }
    } catch (error) {
      toast.error(`${error}`, { id: loadingToastId });
      console.log(error)
    }
  }

  const onEventAdded = event => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEventSources();
    const { title, start, end, description: { mentors, users } } = event
    const updatedEvents = [...events, { title, start, end, mentors, users }];
    setSessions([...sessions, { startDate: `${start}`, endDate: `${end}`, title, users }])
    setEvents(updatedEvents);
    calendarApi.addEventSource(updatedEvents);
  }

  useEffect(() => {
    fetchBootcampSchedules()
  }, [])
  useEffect(() => {
    if (schedules)
      displayEvents()
  }, [schedules])

  return { modalOpen, events, sessions, calendarRef, bootcampStartDate,bootcampEndDate, setModalOpen, onEventAdded, saveEvents }
}
export default useLogic