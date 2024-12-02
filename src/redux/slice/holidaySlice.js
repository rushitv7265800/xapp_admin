/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstanceFetch } from "../../component/api/axiosApi";
import { DangerRight, Success } from "../../component/api/toastServices";

const initialState = {
  isLoading: false,
  isSkeleton: false,
  holiday: [],
  total: null,
};

export const getHoliday = createAsyncThunk(
  "admin/salontime/getHolidayForAdmin",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/salontime/getHolidayForAdmin?startDate=${payload?.startDate}&endDate=${payload?.endDate}&start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);

export const addHoliday = createAsyncThunk(
    "admin/salontime/addHoliday",
    async (payload) => {
      
      return apiInstanceFetch.post(
        `admin/salontime/addHoliday`,payload);
    }
);
  


export const deleteHoliday = createAsyncThunk(
    "admin/salontime/deleteHoliday",
    async (id) => {
      return apiInstanceFetch.delete(
        `admin/salontime/deleteHoliday?id=${id}`);
    }
  );
  

const holidaySlice = createSlice({
  name: "timeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHoliday.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(getHoliday.fulfilled, (state, action) => {
      state.isSkeleton = false;
      state.holiday = action.payload.holidays;
      state.total = action.payload.total;
    });

    builder.addCase(getHoliday.rejected, (state, action) => {
      state.isSkeleton = false;
    });
      
      
    builder.addCase(addHoliday.pending, (state, action) => {
        state.isLoading = true;
    });

    builder.addCase(addHoliday.fulfilled, (state, action) => {
      
      if (action?.payload?.status) {
        
        state.holiday?.unshift(...action.payload.salonOff);
    
        Success("Holiday Added Successfully")
      }else{
        
        DangerRight(action?.payload?.message)
      }
        state.isLoading = false;
    });

    builder.addCase(addHoliday.rejected, (state, action) => {
        state.isLoading = false;
    });
      
      
    builder.addCase(deleteHoliday.pending, (state, action) => {
        state.isLoading = true;
      })
      builder.addCase(deleteHoliday.fulfilled, (state, action) => {
        if (action?.payload?.status) {
          state.holiday = state.holiday.filter((holiday) => holiday?._id !== action.meta.arg);
          Success("Holiday Delete Successfully")
        }
        state.isLoading = false;

      })
      builder.addCase(deleteHoliday.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});
export default holidaySlice.reducer;
