import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice";
import expertSlice from "./slice/expertSlice";
import dialogueSlice from "./slice/dialogueSlice";
import categorySlice from "./slice/categorySlice";
import subCategorySlice from "./slice/subCategorySlice";
import serviceSlice from "./slice/serviceSlice";
import reviewSlice from "./slice/reviewSlice";
import taxSlice from "./slice/taxSlice";
import userSlice from "./slice/userSlice";
import settingSlice from "./slice/settingSlice";
import timeSlice from "./slice/timeSlice";
import bookingSlice from "./slice/bookingSlice";
import payoutSlice from "./slice/payoutSlice";
import dashSlice from "./slice/dashSlice";
import spinnerReducer from "./slice/loading.reducer";
import salarySlice from "./slice/salarySlice";
import attendanceSlice from "./slice/attendanceSlice";
import bannerSlice from "./slice/bannerSlice";
import complainSlice from "./slice/complainSlice";
import notificationSlice from "./slice/notificationSlice";
import holidaySlice from "./slice/holidaySlice";
import depositSlice from "./slice/depositSlice";
import depositmethodSlice from "./slice/depositmethodSlice";
import marketAppSlice from "./slice/marketAppSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expert: expertSlice,
        dialogue: dialogueSlice,
        category: categorySlice,
        subCategory: subCategorySlice,
        service: serviceSlice,
        review: reviewSlice,
        tax: taxSlice,
        user: userSlice,
        setting: settingSlice,
        time: timeSlice,
        marketApp:marketAppSlice,
        booking: bookingSlice,
        payout: payoutSlice,
        depositmethod:depositmethodSlice,
        dash: dashSlice,
        deposit:depositSlice,
        spinner: spinnerReducer,
        salary: salarySlice,
        attendance: attendanceSlice,
        banner: bannerSlice,
        complain: complainSlice,
        notification: notificationSlice,
        holiday: holidaySlice,
    },

});

export default store;