import { Calendar as BigCalendar, CalendarProps, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const Calendar = (props: Omit<CalendarProps, 'localizer'>) => {
  const localizer = momentLocalizer(moment)
  return (
    <BigCalendar {...props} localizer={localizer} />
  )
}
export default Calendar