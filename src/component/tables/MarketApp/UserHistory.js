/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import Button from "../../extras/Button";
import Table from "../../extras/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { getUserHistory, userHistory } from "../../../redux/slice/userSlice";
import Analytics from "../../extras/Analytics";
import Pagination from "../../extras/Pagination";

const UserHistory = () => {
  const { userHistoryData } = useSelector((state) => state.user);
  const { setting } = useSelector((state) => state.setting);

  const [data, setData] = useState([]);
  const { state } = useLocation();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const [type, setType] = useState("ALL");
  const [startDate, setStartDate] = useState("ALL");
  const [endDate, setEndDate] = useState("ALL");
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, window.location.href);
    window.addEventListener("popstate", handelPreviousPage);
    return () => {
      window.removeEventListener("popstate", handelPreviousPage);
    };
  }, []);


  const handelPreviousPage = () => {
    if (state) {
      navigate(-1);
    } else {
      localStorage.removeItem("dialog");
      dispatch({ type: closeDialog });
    }
  };

  useEffect(() => {
    const payload = {
      userId: state ? state?.id : dialogueData?._id,
      type,
      startDate,
      endDate,
    };
    dispatch(getUserHistory(payload));
  }, [dialogueData, type, startDate, endDate]);

  useEffect(() => {
    setData(userHistoryData);
  }, [userHistoryData]);
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  const handleInfo = (id) => {
    navigate("/admin/expert/getExpertProfile", {
      state: {
        id
      }
    })
  }

  const mapData = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{parseInt(index) + 1}</span>,
    },
    {
      Header: "Method",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor" onClick={() => handleInfo(row?.expertId?._id)} >
          {row?.type ? row?.type : "-"}
        </span>
      ),
    },
    {
      Header: "Amount",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.type === "Withdraw" ? <span style={{ color: "rgb(237, 23, 23)" }}>{"-" + " " + row?.diamond}</span> : <span style={{ color: "rgb(17, 192, 13)" }}>{"+" + " " + row?.diamond}</span>}</span>
      ),
      sorting: { type: "client" },
    },
    {
      Header: "Status ",
      Cell: ({ row }) =>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {
            row?.status === "Pending" ?
              <span style={{ color: "#efbb00", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(254, 240, 191)", borderRadius: "6px", padding: "10px" }}>Pending</span>
              : row?.status === "Accepted" ?
                (
                  row?.type === "Withdraw" ?
                    <span style={{ color: "#ed1717", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(255, 241, 241)", borderRadius: "6px", padding: "10px" }}>Paid</span>
                    : <span style={{ color: "#11c00d", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(222, 255, 223)", borderRadius: "6px", padding: "10px" }}>Receive</span>
                )
                : row?.status === "Declined" ?
                  <span style={{ color: "#ed1717", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(255, 241, 241)", borderRadius: "6px", padding: "10px" }}>Reject</span>
                  : "-"}
        </div>,
    },
    {
      Header: "Date",
      Cell: ({ row }) => <span className="text-capitalize text-nowrap">{row?.date}</span>,
    },
  ];

  const bookingType = [
    { name: "Completed", value: "completed" },
    { name: "Cancelled", value: "cancel" },
  ];

  console.log("data", data);
  return (
    <div className="mainCategory">
      <Title name={"User Transection History"} />
      <div className="row">
        <div className="col-2">
          {/* <div className="inputData">
            <label className="styleForTitle" htmlFor="bookingType">
              Booking Type
            </label>
            <select
              name="bookingType"
              className="rounded-2"
              id="bookingType"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="ALL" selected>
                ALL
              </option>
              {bookingType?.map((data) => {
                return <option value={data?.value}>{data?.name}</option>;
              })}
            </select>
          </div> */}
        </div>

        {/* <div className="col-md-3 ">
          <div className="inputData">
            <label>Analytic</label>
          </div>
          <Analytics
            analyticsStartDate={startDate}
            analyticsStartEnd={endDate}
            analyticsStartDateSet={setStartDate}
            analyticsStartEndSet={setEndDate}
          />
        </div> */}
        <div className="col-7 mb-2 pt-2 ms-auto justify-content-end d-flex pe-3">
          <Button
            className={`bg-danger  text-center text-white mt-3`}
            onClick={handelPreviousPage}
            style={{
              borderRadius: "5px",
            }}
            bIcon={`fa-solid fa-angles-left text-white fs-20 m-auto`}
            text='Back'
          />

        </div>
      </div>
      <div>
        <Table
          data={data}
          mapData={mapData}
          PerPage={rowsPerPage}
          Page={page}
          type={"client"}
        />
      </div>
      <Pagination
        type={"client"}
        serverPage={page}
        setServerPage={setPage}
        serverPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalData={data?.length}
      />
    </div>
  );
};

export default UserHistory;
