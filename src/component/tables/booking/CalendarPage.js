import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookingsCalendar } from "../../../redux/slice/bookingSlice";

const localizer = momentLocalizer(moment);
export default function CalendarPage() {
  const { calendarData } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllBookingsCalendar());
  }, []);

  useEffect(() => {
    console.log("calendarData", calendarData);
    setData(calendarData);
  }, [calendarData]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {};

    switch (event.status) {
      case "pending":
        style = {
          backgroundColor: "rgba(136, 230, 247, 0.5)",
          color: "#05879e",
        };
        break;
      case "cancel":
        style = {
            backgroundColor:" rgba(251, 175, 190, .5)",
            color:" #b3092b"
        };
        break;
      case "completed":
        style = {
          backgroundColor: " rgba(147, 231, 195, 0.5",
          color: " #1a8a59",
        };
        break;
      default:
        break;
    }

    return {
      style,
    };
  };

  const dummyEvents = calendarData.map((booking) => {
    const startDateTime = moment(
      `${booking.date} ${booking.time[0]}`,
      "YYYY-MM-DD HH:mm"
    );
    const endDateTime = startDateTime.clone().add(booking.duration, "minutes");

    return {
      id: booking._id,
      title: booking.expert.fullName,
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      status: booking.status,
    };
  });

  console.log("dummyEvents:", dummyEvents);
  return (
    <div>
      <div className="statusShow">
        <h6 className="cancelStatus">Cancel</h6>
        <h6 className="pendingStatus">Pending</h6>
        <h6 className="completedStatus">Completed</h6>
      </div>
      {dummyEvents?.length > 0 && (
        <Calendar
          localizer={localizer}
          views={["month", "week", "day"]}
          events={dummyEvents}
          style={{ height: 600 }}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
        />
      )}
    </div>
  );
}
