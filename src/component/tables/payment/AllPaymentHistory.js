/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */

import { getAllPaymentHistory } from "../../../redux/slice/payoutSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import Table from "../../extras/Table";
import Pagination from "../../extras/Pagination";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const AllPaymentHistory = () => {
  const { payout } = useSelector((state) => state.payout);
  const { setting } = useSelector((state) => state.setting);

  const [data, setData] = useState([]);
  const currentMonth = moment().format("YYYY-MM");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  console.log("state", state);

  const formattedDate = moment(state?.month, "YYYY-MM").format("MMM YYYY");
  useEffect(() => {
    const payload = {
      settlementId: state?.id,
    };
    dispatch(getAllPaymentHistory(payload));
  }, [dispatch]);

  useEffect(() => {
    setData(payout);
  }, [payout]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };



  const mapData = [
    {
      Header: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile  d-flex justify-content-center">
          <img
            src={row?.userId?.image}
            alt="image"
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            className="cursor-pointer"
            height={`100%`}
          />
        </div>
      ),
    },
    {
      Header: "Name",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.userId?.fname + " " + row?.userId?.lname}
        </span>
      ),
    },
    {
      Header: "BookingId",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">{row?.bookingId}</span>
      ),
    },
    {
      Header: "Expert Earning",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.expertEarning + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Admin Commission",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.commission + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Tax",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.tax + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Total",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.rupee + " " + setting?.currencySymbol}
        </span>
      ),
    },

    {
      Header: "Payment Type",
      sorting: { type: "client" },
      body: "paymentType",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.paymentType}</span>
      ),
    },
    {
      Header: "Date",
      sorting: { type: "client" },
      body: "date",
      Cell: ({ row }) => <span className="text-capitalize">{row?.date}</span>,
    },
  ];
  const location = useLocation();
  const handleEarning = (row) => {
    let settlementIdsString = row?.settlementIds?.map((id) => id).join(",");

    navigate("/admin/expert/paymentHistory", {
      state: {
        expert: row?.expertId,
        settlements: settlementIdsString,
      },
    });
    // localStorage.setItem('states',location.state)
  };

  function openImage(imageUrl) {
    // Open the image in a new tab or window
    window.open(imageUrl, "_blank");
  }

  return (
    <div className="mainCategory">
      <Title
        name={`${
          data?.expertId?.fname + " " + data?.expertId?.lname
        }'s Payment History`}
      />
      <div>
        <h4 className="d-flex justify-content-end">
          Total Bonus : {data?.bonus + " " + setting?.currencySymbol}
        </h4>
        <Table
          data={data?.bookingId}
          mapData={mapData}
          Page={page}
          PerPage={rowsPerPage}
          type={"client"}
        />
        <Pagination
          type={"client"}
          serverPage={page}
          setServerPage={setPage}
          serverPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalData={data?.bookingId?.length}
        />
      </div>
    </div>
  );
};

export default AllPaymentHistory;
