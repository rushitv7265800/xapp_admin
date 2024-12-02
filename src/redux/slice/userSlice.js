import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch, apiInstanceFetch2 } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {
    user: [],
    userHistoryData:[],
    isLoading: false,
    isSkeleton: false,
    total: null,
    history:[]
}

export const allUsers = createAsyncThunk("user/getAllUser",async (payload)=>{
    
  return  apiInstanceFetch2.get(`user/getAllUser?start=${payload?.start}&limit=${payload?.limit}`)
})

export const getUser = createAsyncThunk("user/getProfile", async (payload) => {
    return apiInstanceFetch2.get(`user/getProfile?userId=${payload}`)
})
  
export const getUserHistory = createAsyncThunk("withdraw/getWithdrawAndDeposite", async (payload) => {
    return apiInstanceFetch2.get(`withdraw/getWithdrawAndDeposite?userId=${payload?.userId}`)
  })


export const blockUser = createAsyncThunk("user/updateProfile", async (id) => {
    return apiInstance.patch(`user/updateProfile?userId=${id}`)
})

export const blockStatusUser = createAsyncThunk("user/userBockStatus", async (payload) => {
    return apiInstance.patch(`user/userBockStatus?userId=${payload?.userId}&status=${payload?.status}`)
})

const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

        builder.addCase(allUsers.pending,(state,action)=>{
            state.isSkeleton = true;
        })

        builder.addCase(allUsers.fulfilled, (state, action) => {
            
            state.user = action.payload.users;
            state.total = action?.payload?.total
            state.isSkeleton = false;
        })

        builder.addCase(allUsers.rejected,(state,action)=>{
            state.isSkeleton = false;
        })

        builder.addCase(getUserHistory.pending,(state,action)=>{
            state.isSkeleton = true;
        })

        builder.addCase(getUserHistory.fulfilled, (state,action) => {
            state.userHistoryData = action.payload.withdraw;
            state.isSkeleton = false;
        })

        builder.addCase(getUserHistory.rejected,(state,action)=>{
            state.isSkeleton = false;
        })


        builder.addCase(getUser.pending,(state,action)=>{
            state.isLoading = true;
        })

        builder.addCase(getUser.fulfilled, (state,action) => {
            state.user = action?.payload?.user;
            state.isLoading = false;
        })

        builder.addCase(getUser.rejected,(state,action)=>{
            state.isLoading = false;
        })

             
        builder.addCase(blockUser.pending, (state, action) => {
            
            state.isLoading = true;
        })

        builder.addCase(blockUser.fulfilled, (state,action) => {
            if (action.payload?.status) {
                const updatedUser = action?.payload?.user;  
                const userIndex = state?.user?.findIndex(user => user?._id === updatedUser?._id);
                if (userIndex !== -1) {
                  state.user[userIndex].isBlock = updatedUser?.isBlock;
                }
                Success("Updated Successfully");
            }
            state.isLoading = false;

        })

        builder.addCase(blockUser.rejected,(state,action)=>{
            state.isLoading = false;
        })

        builder.addCase(blockStatusUser.pending, (state, action) => {
            
            state.isLoading = true;
        })

        builder.addCase(blockStatusUser.fulfilled, (state,action) => {
            if (action.payload?.status) {
                const updatedUser = action?.payload?.user;  
                const userIndex = state?.user?.findIndex(user => user?._id === updatedUser?._id);
                if (userIndex !== -1) {
                  state.user[userIndex].isBlock = updatedUser?.isBlock;
                }
                Success("Updated Successfully");
            }
            state.isLoading = false;

        })

        builder.addCase(blockStatusUser.rejected,(state,action)=>{
            state.isLoading = false;
        })
    }

})
export default userSlice.reducer;