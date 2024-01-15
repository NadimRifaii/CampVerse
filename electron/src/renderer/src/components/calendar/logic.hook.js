import { useRef, useState } from 'react'
const useLogic = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const calendarRef = useRef(null)
  const [events, setEvents] = useState([])
  const onEventAdded = event => {
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEventSource(updatedEvents);
  }
  return { modalOpen, setModalOpen, onEventAdded, calendarRef }
}
export default useLogic