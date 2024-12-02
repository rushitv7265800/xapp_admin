import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {  apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {
    booking:[],
    calendarData:[],
    futureBooking:[],
    isLoading:false,
    isSkeleton:false,
    total:null
}

export const getAllBookings = createAsyncThunk("user/booking/getAll", async (payload) => {
    
    return apiInstanceFetch.get(`user/booking/getAll?start=${payload?.start}&limit=${payload?.limit}&type=${payload?.type}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`)
})

export const upcomingBookings = createAsyncThunk("user/booking/upcomingBookings", async(type)  => {
    return apiInstanceFetch.get(`user/booking/upcomingBookings?type=${type}`)
})

export const dailyBookings = createAsyncThunk("user/booking/dailyBookings", async(payload)=>{
    return apiInstanceFetch.get(`user/booking/dailyBookings?start=${payload?.start}&limit=${payload?.limit}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`)
})

export const cancelBooking = createAsyncThunk("user/booking/updateBookingStatus", async(payload)  => {
    return apiInstanceFetch.post(`user/booking/updateBookingStatus`,payload)
})


export const getAllBookingsCalendar = createAsyncThunk("user/booking/calenderView", async (payload) => {
    return apiInstanceFetch.get(`user/booking/calenderView`)
})

const bookingSlice = createSlice({
    name:"bookingSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBookings.pending,(state,action)=>{
            state.isSkeleton = true;
        })

        builder.addCase(getAllBookings.fulfilled, (state, action) => {
            
            state.isSkeleton = false;
            state.booking = action.payload.services;
            state.total = action.payload.total
        })

        builder.addCase(getAllBookings.rejected, (state, action) => {
            
            state.isSkeleton = false;
        })

        builder.addCase(getAllBookingsCalendar.pending,(state,action)=>{
            state.isSkeleton = true;
        })

        builder.addCase(getAllBookingsCalendar.fulfilled, (state, action) => {
            state.isSkeleton = false;
            state.calendarData = action.payload.services;
        })

        builder.addCase(getAllBookingsCalendar.rejected, (state, action) => {
            
            state.isSkeleton = false;
        })
        
        builder.addCase(dailyBookings.pending,(state,action)=>{
            state.isSkeleton = true;
        })

        builder.addCase(dailyBookings.fulfilled,(state,action)=>{
            state.isSkeleton = false;
            state.booking = action.payload.data;
            state.total = action.payload.total
        })

        builder.addCase(dailyBookings.rejected,(state,action)=>{
            state.isSkeleton = false;
        })

        builder.addCase(upcomingBookings.pending,(state,action)=>{
            state.isSkeleton = true;
        })

        builder.addCase(upcomingBookings.fulfilled, (state, action) => {
            state.isSkeleton = false;
            state.futureBooking = action.payload.data;
        })

        builder.addCase(upcomingBookings.rejected,(state,action)=>{
            state.isSkeleton = false;
        })

        builder.addCase(cancelBooking.pending,(state,action)=>{
            state.isLoading = true;
        })

        builder.addCase(cancelBooking.fulfilled, (state, action) => {
            if (action.payload.status) {
        
                const bookingIndex = state?.expert?.findIndex((booking) => booking?._id === action?.payload?.booking?._id);
                if (bookingIndex !== -1) {
                  state.booking[bookingIndex] = { ...state?.booking[bookingIndex], ...action?.payload?.booking };
                }
                Success("Booking Cancel Successfully")
              }
              state.isLoading = false;
        })

        builder.addCase(cancelBooking.rejected,(state,action)=>{
            state.isLoading = false;
        })
    }
})
export default bookingSlice.reducer;