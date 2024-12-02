/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */

import {
  settlementPayment,
  yearlyPaymentHistory,
} from "../../../redux/slice/payoutSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import Table from "../../extras/Table";
import Analytics from "../../extras/Analytics";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import SelletementBonusPaneltyDialogue from "../SelletementBonusPaneltyDialogue";
import { openDialog } from "../../../redux/slice/dialogueSlice";

const ExpertSettlementHistory = () => {
  const { payout } = useSelector((state) => state.payout);
  const { setting } = useSelector((state) => state.setting);
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();
  const dDate = moment(startOfMonth).format("YYYY-MM-DD");
  const d2Date = moment(endOfMonth).format("YYYY-MM-DD");
  const [type, setType] = useState("ALL");
  const [startDate, setStartDate] = useState(dDate);
  const [endDate, setEndDate] = useState(d2Date);

  useEffect(() => {
    let payload = {
      startDate: startDate,
      endDate: endDate,
      type: type,
    };
    dispatch(yearlyPaymentHistory(payload));
  }, [startDate, endDate]);

  useEffect(() => {
    setData(payout);
  }, [payout]);

  const dispatch = useDispatch();

  const mapData = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{parseInt(index) + 1}</span>,
    },

    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile d-flex justify-content-center">
          <img
            src={row?.expert?.image}
            alt="image"
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            className="cursor-pointer"
            onClick={() => openHistory(row?.expert?._id)}
            height={`100%`}
          />
        </div>
      ),
    },
    {
      Header: "Expert",
      Cell: ({ row }) => (
        <span
          className="text-capitalize fw-bold cursor"
          onClick={() => openHistory(row?.expert?._id)}
        >
          {row?.expert?.fname + " " + row?.expert?.lname}
        </span>
      ),
    },
    {
      Header: "Month",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">{row?.month}</span>
      ),
    },
    {
      Header: "Total Bookings",
      sorting: { type: "client" },
      body: "totalBookings",
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.bookingId?.length}</span>
      ),
    },

    {
      Header: "Expert Earning",
      sorting: { type: "client" },
      body: "expertEarning",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.expertEarning?.toFixed(2) + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Bonus-Penalty",
      sorting: { type: "client" },
      body: "totalBonusPenalty",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.bonus?.toFixed(2) + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Total Payment (To Expert)",
      sorting: { type: "client" },
      body: "serviceAmount",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.finalAmount?.toFixed(2) + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Status",
      sorting: { type: "client" },
      body: "serviceAmount",
      Cell: ({ row }) => (
        <span className={`${row?.statusOfTransaction === 0 ? 'text-danger' : 'text-success'} text-capitalize`}>
          {row?.statusOfTransaction === 0 ? "Unpaid" : "Paid"}
        </span>
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span>
          {row?.statusOfTransaction === 0 ? (
            <button
              className="py-1 me-2"
              style={{ backgroundColor: "#E0EEFF", borderRadius: "8px" }}
              onClick={() =>
                dispatch(openDialog({ type: "settlement", data: row?._id }))
              }
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5837 11.8939C18.952 11.8939 20.0614 10.7846 20.0614 9.41617C20.0614 8.04778 18.952 6.93848 17.5837 6.93848C16.2153 6.93848 15.106 8.04778 15.106 9.41617C15.106 10.7846 16.2153 11.8939 17.5837 11.8939Z"
                  fill="#1C69DB"
                />
                <path
                  d="M21.9843 3H13.1813C12.6468 3 12.1342 3.21232 11.7563 3.59025C11.3783 3.96819 11.166 4.48077 11.166 5.01525V13.8183C11.1661 14.3527 11.3785 14.8652 11.7564 15.2431C12.1343 15.621 12.6468 15.8334 13.1813 15.8335H21.9843C22.5188 15.8335 23.0314 15.6212 23.4093 15.2433C23.7872 14.8653 23.9995 14.3528 23.9995 13.8183V5.01525C23.9995 4.48077 23.7872 3.96819 23.4093 3.59025C23.0314 3.21232 22.5188 3 21.9843 3ZM17.583 13.7275C15.2057 13.7275 13.272 11.7934 13.272 9.41653C13.272 7.03967 15.2061 5.10554 17.583 5.10554C19.9599 5.10554 21.894 7.03967 21.894 9.41653C21.894 11.7934 19.9599 13.7275 17.583 13.7275Z"
                  fill="#1C69DB"
                />
                <path
                  d="M21.9848 17.208H13.1817C11.3122 17.208 9.7915 15.6873 9.7915 13.8178V5.01524C9.7915 4.81587 9.81213 4.62154 9.84559 4.43134H7.95683C7.95287 4.19114 7.85472 3.96211 7.68353 3.79357C7.51233 3.62504 7.28179 3.53048 7.04156 3.53027H5.66659C5.42562 3.53038 5.1944 3.62546 5.02306 3.79491C4.85173 3.96436 4.75409 4.19451 4.75132 4.43546C3.22693 4.48175 2 5.73298 2 7.26836V19.1953C2.00085 19.9475 2.30002 20.6686 2.83188 21.2005C3.36374 21.7323 4.08486 22.0315 4.83702 22.0323H20.3036C21.0558 22.0315 21.7769 21.7323 22.3088 21.2005C22.8406 20.6686 23.1398 19.9475 23.1406 19.1953V17.0004C22.7704 17.1366 22.3792 17.2072 21.9848 17.208ZM6.5837 8.57184C6.94836 8.57184 7.29809 8.7167 7.55595 8.97455C7.8138 9.23241 7.95867 9.58214 7.95867 9.94681C7.95867 10.3115 7.8138 10.6612 7.55595 10.9191C7.29809 11.1769 6.94836 11.3218 6.5837 11.3218C6.21903 11.3218 5.8693 11.1769 5.61144 10.9191C5.35359 10.6612 5.20872 10.3115 5.20872 9.94681C5.20872 9.58214 5.35359 9.23241 5.61144 8.97455C5.8693 8.7167 6.21903 8.57184 6.5837 8.57184ZM7.95867 19.1133H5.66705C5.42394 19.1133 5.19079 19.0167 5.01888 18.8448C4.84698 18.6729 4.7504 18.4397 4.7504 18.1966C4.7504 17.9535 4.84698 17.7204 5.01888 17.5485C5.19079 17.3766 5.42394 17.28 5.66705 17.28H7.95867C8.20178 17.28 8.43493 17.3766 8.60683 17.5485C8.77874 17.7204 8.87531 17.9535 8.87531 18.1966C8.87531 18.4397 8.77874 18.6729 8.60683 18.8448C8.43493 19.0167 8.20178 19.1133 7.95867 19.1133ZM7.95867 16.3633H5.66705C5.42394 16.3633 5.19079 16.2668 5.01888 16.0949C4.84698 15.923 4.7504 15.6898 4.7504 15.4467C4.7504 15.2036 4.84698 14.9704 5.01888 14.7985C5.19079 14.6266 5.42394 14.53 5.66705 14.53H7.95867C8.20178 14.53 8.43493 14.6266 8.60683 14.7985C8.77874 14.9704 8.87531 15.2036 8.87531 15.4467C8.87531 15.6898 8.77874 15.923 8.60683 16.0949C8.43493 16.2668 8.20178 16.3633 7.95867 16.3633Z"
                  fill="#1C69DB"
                />
              </svg>
            </button>
          ) : null}
          {row?.statusOfTransaction === 0 && (
            <button
              className="py-1"
              style={{ backgroundColor: "#D5F4EE", borderRadius: "8px" }}
              onClick={() => handlePayment(row)}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.8908 8H4.10924C3.81515 8.00032 3.5332 8.11729 3.32524 8.32524C3.11729 8.5332 3.00032 8.81515 3 9.10924V21.0024C3.00032 21.2964 3.11729 21.5784 3.32524 21.7864C3.5332 21.9943 3.81515 22.1113 4.10924 22.1116H25.8908C26.1848 22.1113 26.4668 21.9943 26.6748 21.7864C26.8827 21.5784 26.9997 21.2964 27 21.0024V9.10924C26.9997 8.81515 26.8827 8.5332 26.6748 8.32524C26.4668 8.11729 26.1848 8.00032 25.8908 8ZM25.3866 17.7755C25.3866 17.8557 25.3547 17.9326 25.2979 17.9894C25.2412 18.0461 25.1643 18.078 25.084 18.078C24.5226 18.0786 23.9843 18.3019 23.5873 18.6989C23.1903 19.0959 22.967 19.6342 22.9664 20.1956C22.9664 20.2759 22.9345 20.3528 22.8778 20.4095C22.821 20.4663 22.7441 20.4982 22.6639 20.4982H7.33613C7.2559 20.4982 7.17895 20.4663 7.12222 20.4095C7.06549 20.3528 7.03361 20.2759 7.03361 20.1956C7.03297 19.6342 6.80966 19.0959 6.41266 18.6989C6.01566 18.3019 5.4774 18.0786 4.91597 18.078C4.83573 18.078 4.75879 18.0461 4.70205 17.9894C4.64532 17.9326 4.61345 17.8557 4.61345 17.7755V12.3361C4.61345 12.2559 4.64532 12.179 4.70205 12.1222C4.75879 12.0655 4.83573 12.0336 4.91597 12.0336C5.4774 12.033 6.01566 11.8097 6.41266 11.4127C6.80966 11.0157 7.03297 10.4774 7.03361 9.91597C7.03361 9.83573 7.06549 9.75879 7.12222 9.70205C7.17895 9.64532 7.2559 9.61345 7.33613 9.61345H22.6639C22.7441 9.61345 22.821 9.64532 22.8778 9.70205C22.9345 9.75879 22.9664 9.83573 22.9664 9.91597C22.967 10.4774 23.1903 11.0157 23.5873 11.4127C23.9843 11.8097 24.5226 12.033 25.084 12.0336C25.1643 12.0336 25.2412 12.0655 25.2979 12.1222C25.3547 12.179 25.3866 12.2559 25.3866 12.3361V17.7755Z"
                  fill="#0A856F"
                />
                <path
                  d="M22.3775 10.2148H7.62214C7.55257 10.8283 7.27696 11.4 6.84035 11.8366C6.40375 12.2731 5.83198 12.5486 5.21851 12.6181V17.4862C5.83198 17.5557 6.40375 17.8312 6.84035 18.2677C7.27696 18.7043 7.55257 19.276 7.62214 19.8895H22.3771C22.4467 19.276 22.7223 18.7043 23.1589 18.2677C23.5955 17.8312 24.1672 17.5557 24.7807 17.4862V12.6181C24.1673 12.5485 23.5956 12.273 23.1591 11.8364C22.7226 11.3999 22.4471 10.8282 22.3775 10.2148ZM14.9996 18.5814C13.0534 18.5814 11.4702 16.9982 11.4702 15.052C11.4702 13.1057 13.0534 11.5225 14.9996 11.5225C16.9458 11.5225 18.529 13.1061 18.529 15.052C18.529 16.9978 16.9458 18.5814 14.9996 18.5814Z"
                  fill="#0A856F"
                />
                <path
                  d="M14.9998 17.9806C16.6149 17.9806 17.9242 16.6713 17.9242 15.0562C17.9242 13.4411 16.6149 12.1318 14.9998 12.1318C13.3847 12.1318 12.0754 13.4411 12.0754 15.0562C12.0754 16.6713 13.3847 17.9806 14.9998 17.9806Z"
                  fill="#0A856F"
                />
              </svg>
            </button>
          )}
          {row?.statusOfTransaction === 1 && (
            <button className="bg-success text-light p10-x p4-y fs-12 br-5">
              Paid
            </button>
          )}
        </span>
      ),
    },
    {
      Header: "Info",
      Cell: ({ row }) => (
        <span>
          <button
            className="py-1"
            style={{ backgroundColor: "#CDE7FF", borderRadius: "8px" }}
            onClick={() => handleEarning(row?._id)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9996 3C7.47746 3 3 7.47746 3 12.9996C3 18.5217 7.47746 23 12.9996 23C18.5217 23 23 18.5217 23 12.9996C23 7.47746 18.5217 3 12.9996 3ZM15.0813 18.498C14.5666 18.7012 14.1568 18.8552 13.8495 18.9619C13.5048 19.0745 13.1437 19.1286 12.7812 19.1219C12.1581 19.1219 11.673 18.9695 11.3276 18.6656C10.9822 18.3617 10.8104 17.9765 10.8104 17.5084C10.8104 17.3263 10.8231 17.1401 10.8485 16.9505C10.8799 16.7345 10.9214 16.52 10.9729 16.3079L11.6171 14.0324C11.6739 13.814 11.723 13.6066 11.7619 13.4135C11.8008 13.2188 11.8195 13.0402 11.8195 12.8777C11.8195 12.5881 11.7594 12.385 11.64 12.2707C11.5189 12.1564 11.2912 12.1005 10.9517 12.1005C10.7858 12.1005 10.6148 12.1251 10.4396 12.1767C10.266 12.2301 10.1153 12.2783 9.99175 12.3257L10.1619 11.6248C10.5835 11.4529 10.9873 11.3056 11.3725 11.1837C11.7247 11.0659 12.0932 11.0036 12.4646 10.9992C13.0834 10.9992 13.5608 11.1498 13.8969 11.4478C14.2313 11.7467 14.3998 12.1352 14.3998 12.6127C14.3998 12.7117 14.3879 12.8861 14.3651 13.135C14.3452 13.3676 14.3021 13.5976 14.2364 13.8216L13.5956 16.0904C13.5381 16.2956 13.4909 16.5035 13.4542 16.7134C13.4193 16.8881 13.3986 17.0654 13.3924 17.2434C13.3924 17.5448 13.4593 17.7505 13.5947 17.8597C13.7285 17.9689 13.963 18.0239 14.2948 18.0239C14.4514 18.0239 14.6267 17.996 14.8248 17.9418C15.0212 17.8876 15.1634 17.8394 15.2531 17.7979L15.0813 18.498ZM14.9678 9.2891C14.6764 9.56388 14.2889 9.71343 13.8885 9.70561C13.4686 9.70561 13.1062 9.56677 12.8049 9.2891C12.6615 9.16303 12.5471 9.00757 12.4692 8.8333C12.3913 8.65902 12.3519 8.47002 12.3537 8.27915C12.3537 7.8855 12.506 7.54688 12.8049 7.26667C13.0969 6.9897 13.4861 6.83859 13.8885 6.84593C14.3092 6.84593 14.6698 6.98561 14.9678 7.26667C15.2667 7.54688 15.4165 7.8855 15.4165 8.27915C15.4165 8.6745 15.2667 9.01143 14.9678 9.2891Z"
                fill="#0C7FE9"
              />
            </svg>
          </button>
        </span>
      ),
    },
  ];

  const handleEarning = (id) => {
    navigate("/admin/paymentHistory", {
      state: {
        id,
      },
    });
  };

  const handlePayment = (row) => {
    if (!hasPermission) return permissionError();

    const payload = {
      settlementId: row?._id,
    };
    debugger;
    dispatch(settlementPayment(payload));
  };

  const types = [
    { name: "Pending", value: "pending" },
    { name: "Paid", value: "paid" },
  ];
  return (
    <div className="mainCategory">
      {dialogue && dialogueType === "settlement" && (
        <SelletementBonusPaneltyDialogue />
      )}
      <Title name="Expert Payment history" />
      <div>
        <div className="d-flex">
          <div className="inputData col-lg-2 col-md-4 me-3">
            <label>Select Date</label>
            <Analytics
              analyticsStartDate={startDate}
              analyticsStartEnd={endDate}
              analyticsStartDateSet={setStartDate}
              analyticsStartEndSet={setEndDate}
              allAllow={false}
            />
          </div>
          <div className="col-md-3 col-lg-2 ms-4">
            <div className="inputData">
              <label className="styleForTitle" htmlFor="settlement">
                Settlement Type
              </label>
              <select
                name="types"
                className="rounded-2"
                style={{ marginTop: "12px" }}
                id="bookingType"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  let payload = {
                    startDate: startDate,
                    endDate: endDate,
                    type: e.target.value,
                  };
                  dispatch(yearlyPaymentHistory(payload));
                }}
              >
                <option value="ALL" selected>
                  ALL
                </option>
                {types?.map((data) => {
                  return <option value={data?.value}>{data?.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="m40-bottom inputData col-lg-2 col-md-4 me-3"></div>
        <Table data={data} mapData={mapData} />
      </div>
    </div>
  );
};

export default ExpertSettlementHistory;
