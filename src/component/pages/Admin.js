/* eslint-disable eqeqeq */
import {

  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import $ from "jquery";
import { useEffect } from "react";
import DashBoard from "../tables/Dashboard/DashBoard"
import Booking from "../tables/booking/Booking";
import { AdminProfile } from "./AdminProfile";
import { Expert } from "../tables/expert/Expert";
import Category from "../tables/category/Category";
import SubCategory from "../tables/subCategory/SubCategory";
import Service from "../tables/services/Service";
import { Review } from "../tables/review/Review";
import Tax from "../tables/tax/Tax";
import { User } from "../tables/User/User";
import Setting from "../tables/setting/Setting";
import ExpertProfile from "../tables/expert/ExpertProfile";
import WeekTime from "../tables/timeSlot/WeekTime";
import { useDispatch, useSelector } from "react-redux";
import UpcomingBooking from "../tables/booking/UpcomingBooking";
import StaffEarning from "../tables/StaffEarning";
import Depositmethod from '../tables/depositmethod/Depositmethod'
import AttendanceTable from "../tables/AttendanceTable";
import UserProfile from "../tables/User/UserProfile";
import DailyBooking from "../tables/booking/DailyBooking";
import ExpertHistory from "../tables/expert/ExpertHistory";
import MonthlyReport from "../tables/MonthlyReport";
import Banner from "../tables/banner/Banner";
import Complain from "../tables/complain/Complain";
import ExpertBooking from "../tables/expert/ExpertBooking";
import AllPaymentHistory from "../tables/payment/AllPaymentHistory";
import ExpertPaymentHistory from "../tables/payment/ExpertWiseHistory";
import UserHistory from "../tables/User/UserHistory";
import Holiday from "../tables/timeSlot/Holiday";
import CalendarPage from "../tables/booking/CalendarPage";
import ExpertSettlementHistory from "../tables/payment/ExpertSettlementHistory";
import { Deposit } from "../tables/expert copy/Deposit";
import ContentTable from "../tables/category/Category";
import AdminCoin from "./AdminCoin";
import { MarketApp } from "../tables/MarketApp/MarketApp";
import MarketAppView from "../tables/MarketApp/MarketAppView";


const Admin = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admn } = useSelector((state) => state.auth);






  useEffect(() => {
    if (
      location.pathname == "/" ||
      location.pathname == "/admin" ||
      location.pathname == "/admin/" ||
      location.pathname == ""
    ) {
      navigate("/admin/adminDashboard");

    }
  }, []);
  var webSize = $(window).width();

  return (
    <div className={`mainAdminGrid  ${webSize < 991 && "webAdminGrid"}`}>
      <Sidebar />

      <div className={`mainAdmin`}>
        <Navbar />
        <div className="adminStart">
          <Routes>
            <Route path="/adminDashboard" element={<DashBoard />} />
            <Route path="/bookingTable" element={<Booking />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/withdrawReq" element={<Expert />} />
            <Route path="/contentTable" element={<ContentTable />} />
            <Route path="/depositmethod" element={<Depositmethod />} />
            <Route path="marketapp/marketappview" element={<MarketAppView />} />
            <Route path="/serviceTable" element={<Service />} />
            <Route path="/reviewTable" element={<Review />} />
            <Route path="/adminfund" element={<AdminCoin />} />
            <Route path="/tax" element={<Tax />} />
            <Route path="/marketapp" element={<MarketApp />} />
            <Route path="/userTable" element={<User />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/expert/getExpertProfile" element={<ExpertProfile />} />
            <Route path="/timeTable" element={<WeekTime />} />
            <Route path="/staffEarning" element={<StaffEarning />} />
            <Route path="/holiday" element={<Holiday />} />
            <Route path="/futureBooking" element={<UpcomingBooking />} />
            <Route path="/attendanceTable" element={<AttendanceTable />} />
            <Route path="/user/userProfile" element={<UserProfile />} />
            <Route path="/dailyBookingTable" element={<DailyBooking />} />
            <Route path="/expert/history" element={<ExpertHistory />} />
            <Route path="/expert/booking" element={<ExpertBooking />} />
            <Route path="/monthlyReport" element={< MonthlyReport />} />
            <Route path="/bannerTable" element={<Banner/>} />
            <Route path="/userHistory" element={<Complain/>} />
            <Route path="/paymentHistory" element={<AllPaymentHistory/>} />
            <Route path="/userHistory" element={<UserHistory/>} />
            <Route path="/expert/paymentHistory" element={<ExpertPaymentHistory />} />
            <Route path="/expertSettlement" element={<ExpertSettlementHistory />} />
            <Route path="/calenderPage" element={<CalendarPage />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
