/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import Table from "../../extras/Table";
import { expertHistory } from "../../../redux/slice/salarySlice";
import { useLocation, useNavigate } from "react-router-dom";

const DepositHistory = () => {
    const { salary } = useSelector((state) => state.salary);
    const { setting } = useSelector((state) => state.setting);

    const [data, setData] = useState([]);
    const { state } = useLocation();


  useEffect(() => {

    dispatch(expertHistory(state.id));
  }, [state]);
    

  useEffect(() => {
    setData(salary);
  }, [salary]);

  const dispatch = useDispatch();


  function openHistory(imageUrl) {
    window.open(imageUrl, "_blank");
  }
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
      Cell: ({ index }) => (
        <span>{parseInt(index) + 1}</span>
      ),
    },
   
    {
      Header: "User",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor" onClick={() => handleInfo(row.bookingId?.userId?._id)}>
          {row?.bookingId?.userId?.fname ?row?.bookingId?.userId?.fname + " " + row?.bookingId?.userId?.lname: 'Salon User'}
        </span>
      ),
    },
    {
      Header: "Date",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.bookingId?.date}</span>
      ),
    },
    {
      Header: "Earnings (Expert)",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.expertEarning + " " + setting?.currencySymbol}</span>
      ),
    },
    {
      Header: "Earnings (Admin)",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.adminEarning + " " + setting?.currencySymbol}</span>
      ),
    },
    {
      Header: "Amount",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.bookingId?.rupee + " " + setting?.currencySymbol}</span>
      ),
    },
    {
        Header: "Payout Month",
        Cell: ({ row }) => (
            <span className="text-capitalize">{row?.month}</span>
        ),
    },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <span>
          {row?.statusOfTransaction === 1  && (
           <button className="bg-success text-light p10-x p4-y fs-12 br-5">
           Pending
         </button>
          )}
          {row?.statusOfTransaction === 2 && (
            <button className="bg-success text-light p10-x p4-y fs-12 br-5">
              Paid
            </button>
          )}
        </span>
      ),
      },
      {
        Header: "Settlement Date",
        Cell: ({ row }) => (
          <span className="text-capitalize">
            {row?.settlementDate ? row?.settlementDate :'-'}
          </span>
        ),
    },
    {
      Header: "Payment Date",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.payout ? row?.payout :'Pending'}
        </span>
      ),
    },
  ];


  return (
    <div className="mainCategory">
                <Title name={ 'Expert Booking Details'} />

      <div>
        <Table
          data={data}
          mapData={mapData}
        />
      </div>
    </div>
  );
};

export default DepositHistory;
