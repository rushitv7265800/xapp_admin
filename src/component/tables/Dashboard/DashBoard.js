/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import Table from "../../extras/Table";
import { useEffect } from "react";
import {
  getChart,
  getDashData,
  topServices,
} from "../../../redux/slice/dashSlice";
import { useState } from "react";

import $ from "jquery";
import male from "../../../assets/images/male.png";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { upcomingBookings } from "../../../redux/slice/bookingSlice";
const DashBoard = () => {
  const { booking, dashData } = useSelector((state) => state.dash);
  const { futureBooking } = useSelector((state) => state.booking);
  const { setting } = useSelector((state) => state.setting);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState([]);
  const navigate = useNavigate();
  const [nextBooking, setNextBooking] = useState([]);

  useEffect(() => {
    // dispatch(topServices());
    dispatch(getDashData());
    // dispatch(upcomingBookings(1));
  }, []);

  useEffect(() => {
    setData(booking);
  }, [booking]);

  useEffect(() => {
    setCounts(dashData);
  }, [dashData]);

  useEffect(() => {
    setNextBooking(futureBooking);
  }, [futureBooking]);

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", male);
    });
  });

  const mapData = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{index + 1}</span>,
    },
    {
      Header: "Service",
      Cell: ({ row }) => <span>{row?.serviceName}</span>,
    },
    {
      Header: "Revenue",
      Cell: ({ row }) => (
        <span>{numberWithCommas(row?.finalTotal) + " " + setting?.currencySymbol}</span>
      ),
    },
    {
      Header: "Bookings",
      Cell: ({ row }) => <span>{row?.count}</span>,
    },
  ];

  const appointMentData = [
    {
      Header: "User",
      Cell: ({ row }) => (
        <div className="d-flex">
          <div>
            <img
              src={row?.userId?.image ? row?.userId?.image : male}
              alt=""
              className=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <span className="ms-3 fw-bold fs-18">
            {row?.userId?.fname
              ? row?.userId?.fname + "  " + row?.userId?.lname
              : "Salon User"}
            <div
              className="fs-12 fw-500 text-start"
              style={{ opacity: "0.65" }}
            >
              {row?.date?.split("T")[0]}
            </div>
          </span>
        </div>
      ),
    },
    {
      Header: "Time",
      thClass: "extraMargin",
      tdClass: "extraPadding",
      Cell: ({ row }) => <span>{row?.time[0]}</span>,
    },
    {
      Header: "Show More",
      thClass: "text-decoration-underline special cursor",
      thClick: () => navigate("/admin/futureBooking"),
    },
  ];

  function numberWithCommas(number) {
    const formattedNumber = number?.toLocaleString("en-IN");
    return formattedNumber;
  }

  return (
    <div className="mainDashboard">
      <div className="dashBoardHead">
        <h3 className="m3-bottom text-start">Welcome Admin!</h3>
        <Title name={"Dashboard"} />
      </div>
      <div className="mainDashbox">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Total Users`}
              dashIcon={`fa-solid fa-users`}
              amount={counts?.totalUserCount ? counts?.totalUserCount : 0}
              onClick={() => navigate("/admin/userTable")}
            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Total Active User`}
              dashIcon={`fa-solid fa-user-check`}
              amount={counts?.totalActiveUser ? counts?.totalActiveUser : 0}
              onClick={() => navigate("/admin/userTable")}
            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Total Deposit`}
              dashIcon={`ri-wallet-2-line`}
              amount={counts?.totalDepositCount ? counts?.totalDepositCount : 0}
              onClick={() => navigate("/admin/deposit")}
            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Total Withdraw`}
              dashIcon={`fa-solid fa-sack-dollar`}
              amount={counts?.totalWithdrawCount ? counts?.totalWithdrawCount : 0}
              onClick={() => navigate("/admin/withdrawReq")}
            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Deposit Pending`}
              dashIcon={`ri-wallet-2-line`}
              totalAmountShow={true}
              newClass={`text-warning`}
              totalAmount={counts?.totalDepositPendingAmount ? counts?.totalDepositPendingAmount : 0}
              amount={counts?.totalDepositPendingStatus ? counts?.totalDepositPendingStatus : 0}
              onClick={() => navigate("/admin/deposit")}
            />
          </div>

          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Deposit Solved`}
              dashIcon={`ri-wallet-2-line`}
              totalAmountShow={true}
              newClass={`text-success`}
              totalAmount={counts?.totalDepositSuccessAmount ? counts?.totalDepositSuccessAmount : 0}
              amount={counts?.totalDepositSuccessStatus ? counts?.totalDepositSuccessStatus : 0}
              onClick={() => navigate("/admin/deposit")}
            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Withdraw Pending`}
              newClass={`text-warning`}
              dashIcon={`fa-solid fa-sack-dollar`}
              totalAmountShow={true}
              totalAmount={counts?.totalWithdrawPendingAmount ? counts?.totalWithdrawPendingAmount : 0}
              amount={counts?.totalWithdrawPendingStatus ? counts?.totalWithdrawPendingStatus : 0}
              onClick={() => navigate("/admin/withdrawReq")}
            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox
              title={`Withdraw Solved`}
              newClass={`text-success`}
              dashIcon={`fa-solid fa-sack-dollar`}
              totalAmountShow={true}
              totalAmount={counts?.totalWithdrawSuccessAmount ? counts?.totalWithdrawSuccessAmount : 0}
              amount={counts?.totalWithdrawSuccessStatus ? counts?.totalWithdrawSuccessStatus : 0}
              onClick={() => navigate("/admin/withdrawReq")}
            />
          </div>
        </div>
      </div>
      {/* <div className="m40-top apexChart tsBox">
        <ApexChart />
      </div>
      <div className="row bg-white">
        <div className="col-lg-6 col-md-12 ">
          <div className="m40-top tsBox p-3 br-2">
            <h5 className="text-center text-theme">Top Services</h5>
            <Table
              data={data}
              mapData={mapData}
              className="border-0"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="m40-top tsBox p-3 br-2">
            <h5 className="text-center text-theme">
              Today's Pending Appointments
            </h5>
            <Table
              data={nextBooking}
              mapData={appointMentData}
              className="border-0"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default DashBoard;

const DashBox = ({ dashIcon, title, amount, totalAmountShow, newClass, totalAmount, onClick }) => {
  return (
    <div className="dashBox d-flex cursor" onClick={onClick}>
      <div className="dashIconBox midBox col-xl-4 col-md-5 col-6">
        <div className="dashIcon midBox">
          <i className={`${dashIcon}`}></i>
        </div>
      </div>
      <div className="boxContent text-center col-xl-8 col-md-7 col-6">
        <div className="boxTitle midBox">
          <p className="text-decoration-underline">{title}</p>
        </div>
        {
          totalAmountShow ? (
            <>
              <div className="boxAmount d-flex justify-content-around align-items-center mt-2">
                <p style={{ fontSize: "16px" }}>{amount}<span className={`${newClass}`}>{" "+"("+"₹" + ":" +" " + totalAmount+")"}</span></p>
              </div>
            </>
          ) : (
            <div className="boxAmount midBox mt-2">
              <p >{amount}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

const ApexChart = () => {
  const { chartData } = useSelector((state) => state.dash);
  const dispatch = useDispatch();
  var webSize = $(window).width();
  const resHeight =
    webSize >= 992 ? 500 : webSize < 992 && webSize > 576 ? 400 : 300;
  const [chart, setChart] = useState();

  useEffect(() => {
    const payload = { startDate: "ALL", endDate: "ALL" };
    // dispatch(getChart(payload));
  }, []);

  useEffect(() => {
    setChart(chartData);
  }, [chartData]);

  let label = [];
  let data = [];
  let dataAmount = [];
  let dataCount = [];

  const total = chart;

  chart?.map((data_) => {
    const newDate = data_.date;
    var date;
    if (newDate._id) {
      data = dayjs(newDate?._id).format("DD MMM YYYY");
    } else {
      date = dayjs(newDate).format("DD MMM YYYY");
    }

    date?.length > 0 && label.push(date);
    dataAmount.push(parseInt(data_.revenue));
    dataCount.push(parseInt(data_.count));
  });

  const totalSeries = {
    labels: label,
    dataSet: [
      {
        name: "Total Revenue",
        data: dataAmount,
      },
      {
        name: "Total Count",
        data: dataCount,
      },
    ],
  };
  const optionsTotal = {
    chart: {
      type: "area",
      stacked: false,
      height: 500,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8e8da4",
        },
        offsetX: 10,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      categories: label,
      rotate: 0,
      rotateAlways: true,
      minHeight: 200,
      maxHeight: 280,
    },
    tooltip: {
      shared: true,
    },
    title: {
      text: "Revenue And Booking Data",
      style: {
        color: "#1C2B20",
        marginTop: "50px",
      },
      align: "center",
      offsetX: 20,
      cssClass: "mt-5",
    },
    gend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -10,
      offsetX: -100,
    },
    colors: ["#259ACD", "#0f7085"],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={optionsTotal}
        series={totalSeries.dataSet}
        type="area"
        height={resHeight}
      />
    </div>
  );
};
