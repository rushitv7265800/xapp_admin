import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import {  Success } from "../../component/api/toastServices";

const initialState = {
  payout: [],
  total: null,
  isLoading: false,
  isSkeleton: false,
};

export const getPayout = createAsyncThunk(
  "admin/expert/expertEarningForAdmin",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/expert/expertEarningForAdmin?startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const getAllPaymentHistory = createAsyncThunk(
  "aadmin/settlement/settlementInfo",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/settlement/settlementInfo?settlementId=${payload?.settlementId}`
    );
  }
);

export const particularPaymentHistory = createAsyncThunk(
  "admin/payment/particularPaymentHistory",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/payment/particularPaymentHistory?settlementIds=${payload?.settlementIds}&expertId=${payload?.expertId}`
    );
  }
);

export const yearlyPaymentHistory = createAsyncThunk(
  "admin/settlement/get",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/settlement/get?startDate=${payload?.startDate}&endDate=${payload?.endDate}&type=${payload?.type}`
    );
  }
);

export const bonusPenaltySettlement = createAsyncThunk(
  "admin/settlement/bonusPenalty",
  async (payload) => {
    return apiInstance.put(
      `admin/settlement/bonusPenalty?settlementId=${payload?.settlementId}`,
      payload?.data
    );
  }
);

export const settlementPayment = createAsyncThunk(
  "admin/settlement/expertPayment",
  async (payload) => {
    debugger
    return apiInstance.put(
      `admin/settlement/expertPayment?settlementId=${payload.settlementId}`
    );
  }
);

const payoutSlice = createSlice({
  name: "payoutSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayout.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(getPayout.fulfilled, (state, action) => {
      state.payout = action?.payload?.bookings;
      state.isSkeleton = false;
    });

    builder.addCase(getPayout.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(getAllPaymentHistory.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(getAllPaymentHistory.fulfilled, (state, action) => {
      state.payout = action?.payload?.settlement;
      state.isSkeleton = false;
    });

    builder.addCase(getAllPaymentHistory.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(particularPaymentHistory.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(particularPaymentHistory.fulfilled, (state, action) => {
      state.payout = action?.payload?.data;
      state.isSkeleton = false;
    });

    builder.addCase(particularPaymentHistory.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(yearlyPaymentHistory.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(yearlyPaymentHistory.fulfilled, (state, action) => {
      state.payout = action?.payload?.data;
      state.isSkeleton = false;
    });

    builder.addCase(yearlyPaymentHistory.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(bonusPenaltySettlement.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(bonusPenaltySettlement.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        const payoutIdx = state.payout.findIndex(
          (payout) => payout._id === action.payload?.settlement?._id
        );
        if (payoutIdx !== -1) {
          state.payout[payoutIdx] = {
            ...state?.payout[payoutIdx],
            ...action?.payload?.settlement,
          };
        }
      }
      state.isLoading = false;
      Success("Bonus-Penalty Update Successfully");
    });

    builder.addCase(bonusPenaltySettlement.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(settlementPayment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(settlementPayment.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        const settlementIdx = state.payout.findIndex(
          (payout) => payout?._id === action?.payload?.data?._id
        );
        debugger
        if (settlementIdx !== -1) {
          debugger
          state.payout[settlementIdx] = {
            ...state?.payout[settlementIdx],
            ...action?.payload?.data,
          };
        }
      }
      state.isLoading = false;
      Success("Salary Paid Successfully");
    });

    builder.addCase(settlementPayment.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default payoutSlice.reducer;
