import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";


const initialState = {
  depositmethodData: [],
  isSkeleton: false,
  isLoading: false,
}

export const getdepositPayment = createAsyncThunk('depositPayment/get', async () => {
  return apiInstanceFetch.get('depositPayment/get');
})

export const createdepositPayment = createAsyncThunk('depositPayment/create', async (data) => {

  return apiInstance.post(`depositPayment/create`, data);
})

export const updatedepositPayment = createAsyncThunk('depositPayment/update', async (payload) => {
  return apiInstance.patch(`depositPayment/update?depositPaymentId=${payload?.id}`, payload.data);
})

export const deleteDepositPayment = createAsyncThunk('depositPayment/delete', async (id) => {
  return apiInstanceFetch.delete(`depositPayment/delete?depositPaymentId=${id}`);
})

export const isActiveDepositPayment = createAsyncThunk('depositPayment/isActive', async (payload) => {
  return apiInstanceFetch.put(`depositPayment/isActive?id=${payload?.id}`, payload?.data);
})

const depositmethodSlice = createSlice({
  name: "depositmethodSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getdepositPayment.pending, (state, action) => {
      state.isSkeleton = true;
    })

    builder.addCase(getdepositPayment.fulfilled, (state, action) => {
      state.depositmethodData = action.payload.data;
      state.isSkeleton = false;
    })

    builder.addCase(getdepositPayment.rejected, (state, action) => {
      state.isSkeleton = false;
    })

    builder.addCase(createdepositPayment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createdepositPayment.fulfilled, (state, action) => {
      if (action.payload?.status) {
        state.depositmethodData.unshift(action.payload?.data);
        Success("Deposit Payment Add Successfully")
      }
      state.isLoading = false;
    });

    builder.addCase(createdepositPayment.rejected, (state, action) => {
      state.isLoading = false;
    });


    builder.addCase(updatedepositPayment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updatedepositPayment.fulfilled, (state, action) => {

      if (action.payload?.status) {
        const bannerIndex = state.depositmethodData.findIndex((depositmethodData) => depositmethodData?._id === action.payload?.data?._id);
        if (bannerIndex !== -1) {
          state.depositmethodData[bannerIndex] = { ...state.depositmethodData[bannerIndex], ...action.payload?.data };
        }
      }
      state.isLoading = false;
      Success("Deposit Payment Update Successfully")

    });

    builder.addCase(updatedepositPayment.rejected, (state, action) => {

      state.isLoading = false;
    });


    builder.addCase(isActiveDepositPayment.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(isActiveDepositPayment.fulfilled, (state, action) => {
      if (action.payload?.status) {
        const updatedBanner = action.payload?.data;
        const depositmethodDataIndex = state.depositmethodData.findIndex(depositmethodData => depositmethodData?._id === updatedBanner?._id);
        if (depositmethodDataIndex !== -1) {

          state.depositmethodData[depositmethodDataIndex].isActive = updatedBanner.isActive;
        }
        Success("Deposit Payment Status Update Successfully")
      }
      state.isLoading = false;

    })
    builder.addCase(isActiveDepositPayment.rejected, (state, action) => {

      state.isLoading = false;
    })

    builder.addCase(deleteDepositPayment.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(deleteDepositPayment.fulfilled, (state, action) => {
      if (action.payload?.status) {
        state.depositmethodData = state.depositmethodData.filter((depositmethodDataIndex) => depositmethodDataIndex?._id !== action.meta.arg);
        Success("Payment Delete Successfully")
      }
      state.isLoading = false;

    })
    builder.addCase(deleteDepositPayment.rejected, (state, action) => {
      state.isLoading = false;
    })

  }
})
export default depositmethodSlice.reducer