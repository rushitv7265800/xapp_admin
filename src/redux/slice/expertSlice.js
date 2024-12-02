/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch, apiInstanceFetch2 } from "../../component/api/axiosApi";
import {  Success } from "../../component/api/toastServices";

const initialState = {
  expert: [],
  isLoading: false,
  isSkeleton: false,
  oneExpert: {},
  withdrawInfo:{},
  total:null
};

export const getAllExpert = createAsyncThunk("withdraw/getAllWithdraw", async (payload) => {
  
  return apiInstanceFetch2.get(`withdraw/getAllWithdraw?start=${payload?.start}&limit=${payload?.limit}`);
});

export const getExpert = createAsyncThunk("withdraw/user", async (id) => {

  return apiInstanceFetch2.get(`withdraw/user?userId=${id}`);
});
export const getWithdrawInfo = createAsyncThunk("withdraw/getwithdrawId", async (id) => {

  return apiInstanceFetch2.get(`withdraw/getwithdrawId?withdrawId=${id}`);
});

export const withdrawAction = createAsyncThunk("withdraw/update/withdrawId", async (payload) => {

  return apiInstanceFetch2.patch(`withdraw/update?withdrawId=${payload?.id}&type=${payload?.type}`);
});

export const expertAdd = createAsyncThunk("admin/expert", async (payload) => {

  return apiInstance.post("admin/expert", payload);
});

export const expertUpdate = createAsyncThunk("admin/expert/update", async (payload) => {
  
  return apiInstance.patch(`admin/expert/update/${payload?.expertId}`, payload?.formData);
})

export const expertDelete = createAsyncThunk("admin/expert/delete", async (id) => {

  return apiInstance.patch(`admin/expert/delete/${id}`)
})

export const verifyExpert = createAsyncThunk("admin/expert/isVerify", async (id) => {
  return apiInstance.put(`admin/expert/isVerify?${id}`)
})

export const blockExpert = createAsyncThunk("admin/expert/isBlock", async (id) => {

  return apiInstance.put(`admin/expert/isBlock?expertId=${id}`)
})


const expertSlice = createSlice({
  name: "expertSlice",
  initialState,
  reducers: {},
  // GetAll Expert
  extraReducers: (builder) => {
    builder.addCase(getAllExpert.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(getAllExpert.fulfilled, (state, action) => {
      
      state.isSkeleton = false;
      state.expert = action?.payload?.data;
      state.total = action?.payload?.total
    });

    builder.addCase(getAllExpert.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(getExpert.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getExpert.fulfilled, (state, action) => {
      state.isLoading = false;
      state.oneExpert = action.payload?.data;
    });

    builder.addCase(getExpert.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getWithdrawInfo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getWithdrawInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.withdrawInfo = action.payload?.data;
    });

    builder.addCase(getWithdrawInfo.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(withdrawAction.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(withdrawAction.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.status) {
        const expertIndex = state.expert.findIndex((expertData) => expertData?._id === action.payload?.withdraw?._id);
        if (expertIndex !== -1) {
          state.expert[expertIndex] = { ...state.expert[expertIndex], ...action.payload?.withdraw };
        }
      }
      if(action.payload?.withdraw?.status === 1){
        Success("Withdraw Successfully")
      }else if(action.payload?.withdraw?.status ===2){
        Success("withdraw decline")
      }
    });

    builder.addCase(withdrawAction.rejected, (state, action) => {
      state.isLoading = false;
    });
    // add Expert

    builder.addCase(expertAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(expertAdd.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.expert.unshift(action.payload?.expert);
        Success("Expert Create Successfully")
      }
      state.isLoading = false;

    });

    builder.addCase(expertAdd.rejected, (state, action) => {
      state.isLoading = false;
    });


    builder.addCase(expertUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(expertUpdate.fulfilled, (state, action) => {
      
      if (action.payload.status) {
        
        const expertIdx = state.expert.findIndex((expert) => expert._id === action.payload.expert._id);
        if (expertIdx !== -1) {
          state.expert[expertIdx] = { ...state.expert[expertIdx], ...action.payload.expert };
        }
        Success("Expert Update Successfully")
      }
      state.isLoading = false;

    });

    builder.addCase(expertUpdate.rejected, (state, action) => {
      
      state.isLoading = false;
    });

    // delete Expert

    builder.addCase(expertDelete.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(expertDelete.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.expert = state.expert.filter((expert) => expert._id !== action.meta.arg);
        Success("Expert Delete Successfully")
      }
      state.isLoading = false;

    })
    builder.addCase(expertDelete.rejected, (state, action) => {
      state.isLoading = false;
    })

    // block unblock expert
    builder.addCase(blockExpert.pending, (state, action) => {
      // state.isLoading = true;
    })

    builder.addCase(blockExpert.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedExpert = action.payload.expert; 
        const expertIndex = state.expert.findIndex(expert => expert?._id === updatedExpert?._id);
        if (expertIndex !== -1) {
                  
          state.expert[expertIndex] = { ...state.expert[expertIndex], ...action.payload?.expert };
        }
        Success("Expert Update Successfully")
      }
    })

    builder.addCase(blockExpert.rejected, (state, action) => {
      // state.isLoading = false;
    })


  },
});
export default expertSlice.reducer;
