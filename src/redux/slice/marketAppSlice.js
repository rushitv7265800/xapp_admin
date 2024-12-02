import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";


const initialState = {
    marketAppData: [],
    isSkeleton: false,
    isLoading: false,
}

export const getMarketDataAll = createAsyncThunk('marketingApp/get', async () => {
    return apiInstanceFetch.get('marketingApp/get');
})

export const createMarketData = createAsyncThunk('marketingApp/create', async (data) => {
  
    return apiInstance.post(`marketingApp/create`,data);
})

export const updateMarketApp = createAsyncThunk('marketingApp/update', async (payload) => {
    return apiInstance.patch(`marketingApp/update?bannerId=${payload?.id}`,payload.data);
})

export const deleteMarketApp = createAsyncThunk('marketingApp/delete', async (id) => {
    return apiInstanceFetch.delete(`marketingApp/delete?bannerId=${id}`);
})

export const isActiveMarketApp = createAsyncThunk('marketingApp/isActive', async (payload) => {
    return apiInstanceFetch.put(`marketingApp/isActive?id=${payload?.id}`,payload?.data);
})

const marketAppSlice = createSlice({
    name: "marketAppSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getMarketDataAll.pending, (state, action) => {
            state.isSkeleton = true;
        })

        builder.addCase(getMarketDataAll.fulfilled, (state, action) => {
            state.marketAppData = action.payload.data;
            state.isSkeleton = false;
        })

        builder.addCase(getMarketDataAll.rejected, (state, action) => {
            state.isSkeleton = false;
        })

        builder.addCase(createMarketData.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(createMarketData.fulfilled, (state, action) => {
          if (action.payload?.status) {
            state.marketAppData.unshift(action.payload?.data);
        
            Success("MarketApp Add Successfully")
          }
            state.isLoading = false;
        });

        builder.addCase(createMarketData.rejected, (state, action) => {
            state.isLoading = false;
        });


        builder.addCase(updateMarketApp.pending, (state, action) => {
            state.isLoading = true;
          });
      
          builder.addCase(updateMarketApp.fulfilled, (state, action) => {
            
            if (action.payload?.status) {
              const marketAppIndex = state.marketAppData.findIndex((marketApp) => marketApp?._id === action.payload?.data?._id);
              if (marketAppIndex !== -1) {
                state.marketAppData[marketAppIndex] = { ...state.marketAppData[marketAppIndex], ...action.payload?.data };
              }
            }
            state.isLoading = false;
            Success("MarketApp Update Successfully")

          });
      
          builder.addCase(updateMarketApp.rejected, (state, action) => {
            
            state.isLoading = false;
          });


          builder.addCase(isActiveMarketApp.pending, (state, action) => {
            state.isLoading = true;
          })
      
          builder.addCase(isActiveMarketApp.fulfilled, (state, action) => {
            if (action.payload?.status) {
              const updatedBanner = action.payload?.data;
              const bannerIndex = state.marketAppData.findIndex(banner => banner?._id === updatedBanner?._id);
              if (bannerIndex !== -1) {
                   
                state.marketAppData[bannerIndex].isActive = updatedBanner.isActive;
              }
              Success("MarketApp Status Update Successfully")       
            }
            state.isLoading = false;

          })
          builder.addCase(isActiveMarketApp.rejected, (state, action) => {
               
            state.isLoading = false;
          })

          builder.addCase(deleteMarketApp.pending, (state, action) => {
            state.isLoading = true;
          })
          builder.addCase(deleteMarketApp.fulfilled, (state, action) => {
            if (action.payload?.status) {
              state.marketAppData = state.marketAppData.filter((banner) => banner._id !== action.meta.arg);
              Success("MarketApp Delete Successfully")
            }
            state.isLoading = false;

          })
          builder.addCase(deleteMarketApp.rejected, (state, action) => {
            state.isLoading = false;
          })
      
    }
})
export default marketAppSlice.reducer