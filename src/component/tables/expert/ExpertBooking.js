/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import Table from "../../extras/Table";
import Pagination from "../../extras/Pagination";
import { expertRevenue} from "../../../redux/slice/salarySlice";
import { useLocation, useNavigate } from "react-router-dom";
import Analytics from "../../extras/Analytics";

const ExpertBooking = () => {
  const { salary, total } = useSelector((state) => state.salary);
  const { setting } = useSelector((state) => state.setting);

  const [data, setData] = useState([]);
  const { state } = useLocation();
  const [startDate, setStartDate] = useState("ALL");
  const [endDate, setEndDate] = useState("ALL");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  console.log("state", state);

  useEffect(() => {
    const payload = {
      expertId: state?.id,
      startDate,
      endDate,
      start: page,
      limit: rowsPerPage,
    };
    dispatch(expertRevenue(payload));
  }, [state, startDate, endDate, page, rowsPerPage]);

  useEffect(() => {
    setData(salary);
  }, [salary]);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };


  const navigate = useNavigate();
  const handleInfo = (id) => {
    navigate("/admin/user/userProfile", {
      state: {
        id,
      },
    });
  };
  const mapData = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{parseInt(index) + 1}</span>,
    },
  
    {
      Header: "User",
      Cell: ({ row }) => (
        <span
          className="text-capitalize fw-bold cursor"
          onClick={() => handleInfo(row.userId?._id)}
        >
          {row?.userId?.fname
            ? row?.userId?.fname + " " + row?.userId?.lname
            : "Salon User"}
        </span>
      ),
    },
    {
      Header: "Date",
      Cell: ({ row }) => <span className="text-capitalize">{row?.date}</span>,
    },
    {
      Header: "BookingId",
      Cell: ({ row }) => <span className="text-capitalize">{row?.bookingId}</span>,
    },
    {
      Header: "Earnings (Expert)",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.expertEarning + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Earnings (Admin)",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.commission + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Amount",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.rupee + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Payout Month",
      Cell: ({ row }) => <span className="text-capitalize">{row?.month}</span>,
    },

    {
      Header: "Settlement Type",
      Cell: ({ row }) => (
        <span>
          {row?.isSettle === true ? (
            <button className="bg-success text-light p10-x p4-y fs-12 br-5">
              Settled
            </button>
          ) : (
            <button className="bg-danger text-light p10-x p4-y fs-12 br-5">
              Unsettled
            </button>
          )}
        </span>
      ),
    },
  ];




  return (
    <div className="mainCategory">
      <Title
        name={`${
          data[0]?.expertId?.fname
            ? data[0]?.expertId?.fname +
              " " +
              data[0]?.expertId?.lname +
              "'s Booking History"
            : "Salon Expert Booking History"
        }`}
      />
      <div className="col-md-9 ">
        <div className="inputData">
          <label>Analytic</label>
        </div>
        <Analytics
          analyticsStartDate={startDate}
          analyticsStartEnd={endDate}
          analyticsStartDateSet={setStartDate}
          analyticsStartEndSet={setEndDate}
        />
      </div>
      <div>
        <Table
          data={data}
          mapData={mapData}
          serverPerPage={rowsPerPage}
          // PerPage={rowsPerPage}
          Page={page}
        />
      </div>
      <Pagination
        type={"server"}
        serverPage={page}
        setServerPage={setPage}
        serverPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalData={total}
      />
    </div>
  );
};

export default ExpertBooking;
