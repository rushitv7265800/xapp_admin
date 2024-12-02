import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {
  salary: [],
  isLoading: false,
  isSkeleton: false,
  total: null,
};

export const getSalary = createAsyncThunk(
  "admin/settlementForAdmin",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/settlementForAdmin?start=${payload?.start}&limit=${payload?.limit}&month=${payload?.month}&type=${payload?.type}`
    );
  }
);

export const bonusPenalty = createAsyncThunk(
  "expert/expertSettlement/bonusOrpenalty",
  async (payload) => {
    return apiInstance.post(
      `expert/expertSettlement/bonusOrpenalty?expertId=${payload?.expertId}&month=${payload?.month}`,
      payload?.data
    );
  }
);

export const payment = createAsyncThunk(
  "expert/expertSettlement/update",
  async (payload) => {
    return apiInstance.patch(
      `expert/expertSettlement/update?expertId=${payload.expertId}&month=${payload?.month}`,
      payload.data
    );
  }
);

export const expertRevenue = createAsyncThunk(
  "admin/expert/expertBookings",
  async (payload) => {
    return apiInstanceFetch.get(
      `admin/expert/expertBookings?expertId=${payload.expertId}&startDate=${payload?.startDate}&endDate=${payload?.endDate}&start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);

export const expertHistory = createAsyncThunk(
  "expert/expertSettlement/getForExpert",
  async (id) => {
    return apiInstanceFetch.get(
      `expert/expertSettlement/getForExpert?expertId=${id}`
    );
  }
);

export const monthlyState = createAsyncThunk("admin/monthlyState", async () => {
  return apiInstanceFetch.get(`admin/monthlyState`);
});

const salarySlice = createSlice({
  name: "salarySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalary.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(getSalary.fulfilled, (state, action) => {
      state.salary = action?.payload?.data;
      state.isSkeleton = false;
    });

    builder.addCase(getSalary.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(expertHistory.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(expertHistory.fulfilled, (state, action) => {
      state.salary = action?.payload?.settlement;
      state.isSkeleton = false;
    });

    builder.addCase(expertHistory.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(expertRevenue.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(expertRevenue.fulfilled, (state, action) => {
      state.salary = action?.payload?.bookings;
      state.total = action?.payload?.total;
      state.isSkeleton = false;
    });

    builder.addCase(expertRevenue.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(bonusPenalty.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(bonusPenalty.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        const salaryIdx = state.salary.findIndex(
          (salary) => salary._id === action.payload?.settlement?._id
        );
        if (salaryIdx !== -1) {
          state.salary[salaryIdx] = {
            ...state?.salary[salaryIdx],
            ...action?.payload?.settlement,
          };
        }
      }
      state.isLoading = false;
      Success("Bonus-Penalty Update Successfully");
    });

    builder.addCase(bonusPenalty.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(payment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(payment.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        const salaryIdx = state.salary.findIndex(
          (salary) => salary._id === action.payload?.history?._id
        );
        if (salaryIdx !== -1) {
          state.salary[salaryIdx] = {
            ...state?.salary[salaryIdx],
            ...action?.payload?.history,
          };
        }
      }
      state.isLoading = false;
      Success("Salary Paid Successfully");
    });

    builder.addCase(payment.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(monthlyState.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(monthlyState.fulfilled, (state, action) => {
      state.salary = action?.payload?.result;
      state.total = action?.payload?.total;

      state.isSkeleton = false;
    });

    builder.addCase(monthlyState.rejected, (state, action) => {
      state.isSkeleton = false;
    });
  },
});
export default salarySlice.reducer;
