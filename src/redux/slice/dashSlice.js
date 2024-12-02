import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { DangerRight, Success } from "../../component/api/toastServices";


const initialState = {
    booking: [],
    isLoading: false,
    isSkeleton: false,
    dashData:{},
    chartData:[]
}

export const topServices = createAsyncThunk("admin/service/topServices", async () =>{
  return  apiInstanceFetch.get('admin/service/topServices')
})

export const getDashData = createAsyncThunk("dashBoard/get", async () =>{
    return  apiInstanceFetch.get('dashBoard/get')
  })

  export const getChart = createAsyncThunk("admin/chartApiForPenal", async (payload) =>{
    return  apiInstanceFetch.get(`admin/chartApiForPenal?startDate=${payload?.startDate}&endDate=${payload?.endDate}`)
  })
const dashSlice = createSlice({
    name:"dashSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{

        builder.addCase(topServices.pending,(state,action) =>{
            state.isSkeleton = true;
        })

        builder.addCase(topServices.fulfilled,(state,action) =>{
            
            state.booking = action?.payload?.topServices
            state.isSkeleton = false;
        })

        builder.addCase(topServices.rejected,(state,action) =>{
            
            state.isSkeleton = false;
        })

        builder.addCase(getDashData.pending,(state,action) =>{
            state.isLoading = true;
        })

        builder.addCase(getDashData.fulfilled,(state,action) =>{
            
            state.dashData = action?.payload?.data
            state.isLoading = false;
        })

        builder.addCase(getDashData.rejected,(state,action) =>{
            
            state.isLoading = false;
        })

        builder.addCase(getChart.fulfilled,(state,action) =>{
            
            state.chartData = action?.payload?.appointments
            state.isSkeleton = false;
        })

        builder.addCase(getChart.rejected,(state,action) =>{
            
            state.isSkeleton = false;
            DangerRight(action?.message)
        })
    }
})
export default dashSlice.reducer