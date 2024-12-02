/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../extras/Title";
import Table from "../extras/Table";
import { getAttendExpert } from "../../redux/slice/attendanceSlice";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import Male from "../../assets/images/male.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceTable = () => {
  const [data, setData] = useState([]);
  const { attendance } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const thisMonth = new Date();
  thisMonth.setDate(1); 
  
  const [selectedDate, setSelectedDate] = useState(thisMonth);

    useEffect(() => {
        const formattedDate = moment(selectedDate, 'YYYY-MM').format('YYYY-MM');
        dispatch(getAttendExpert(formattedDate));
  }, [selectedDate, dispatch]);

  useEffect(() => {
    setData(attendance);
  }, [attendance]);

  const handleInfo = (id) => {
    navigate("/admin/expert/getExpertProfile", {
      state: {
        id,
      },
    });
  };

  const expertTable = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{index + 1}</span>,
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
          <div
            className="userProfile d-flex justify-content-center"
           
          >
            <img
              src={row?.expertId?.image}
              alt="image"
              style={{ height: "70px", width: "70px", overflow: "hidden" }}
              className="cursor-pointer"
              onClick={() => handleInfo(row?.expertId?._id)}
              height={`100%`}
              
              onError={(e) => {
                e.target.src = Male;
              }}
            />
          </div>
      ),
    },
    {
      Header: "Name",
      Cell: ({ row }) => (
        <span
          className="text-capitalize fw-bold cursor"
          onClick={() => handleInfo(row?.expertId?._id)}
        >
          {row?.expertId?.fname + " " + row?.expertId?.lname}
        </span>
      ),
    },
    {
      Header: "Month Year",
      Cell: ({ row }) => <span className="text-capitalize">{row?.month}</span>,
    },
    {
      Header: "Available Days",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.attendCount}</span>
      ),
    },
    {
      Header: "Absent Days",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.absentCount}</span>
      ),
    },
    {
      Header: "Total Days",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.totalDays}</span>
      ),
    },
  ];

    const handleDateChange = (date) => {
        const selectedDateObject = moment(date, "YYYY-MM").toDate();
        setSelectedDate(selectedDateObject);
    };
    
    console.log('selectedDate', selectedDate)
  return (
    <div className="mainExpert">
      <Title name="Staff Attendance Data" />
      <div className="m30-bottom inputData col-lg-2 col-md-4 z-index-3 position-relative">
        <label>Select Month</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM"
          showMonthYearPicker
        />
      </div>

      <div>
        <Table data={data} mapData={expertTable} />
      </div>
    </div>
  );
};

export default AttendanceTable;
