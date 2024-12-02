import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";


const initialState = {
    banner: [],
    isSkeleton: false,
    isLoading: false,
}

export const getBanners = createAsyncThunk('banner/get', async () => {
    return apiInstanceFetch.get('banner/get');
})

export const createBanners = createAsyncThunk('banner/create', async (data) => {
  
    return apiInstance.post(`banner/create`,data);
})

export const updateBanner = createAsyncThunk('banner/update', async (payload) => {
    return apiInstance.patch(`banner/update?bannerId=${payload?.id}`,payload.data);
})

export const deleteBanner = createAsyncThunk('banner/delete', async (id) => {
    return apiInstanceFetch.delete(`banner/delete?bannerId=${id}`);
})

export const isActive = createAsyncThunk('banner/isActive', async (payload) => {
    return apiInstanceFetch.put(`banner/isActive?id=${payload?.id}`,payload?.data);
})

const bannerSlice = createSlice({
    name: "bannerSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getBanners.pending, (state, action) => {
            state.isSkeleton = true;
        })

        builder.addCase(getBanners.fulfilled, (state, action) => {
            state.banner = action.payload.data;
            state.isSkeleton = false;
        })

        builder.addCase(getBanners.rejected, (state, action) => {
            state.isSkeleton = false;
        })

        builder.addCase(createBanners.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(createBanners.fulfilled, (state, action) => {
          if (action.payload?.status) {
            state.banner.unshift(action.payload?.data);
        
            Success("Banner Add Successfully")
          }
            state.isLoading = false;
        });

        builder.addCase(createBanners.rejected, (state, action) => {
            state.isLoading = false;
        });


        builder.addCase(updateBanner.pending, (state, action) => {
            state.isLoading = true;
          });
      
          builder.addCase(updateBanner.fulfilled, (state, action) => {
            
            if (action.payload.status) {
              const bannerIndex = state.banner.findIndex((banner) => banner._id === action.payload?.data?._id);
              if (bannerIndex !== -1) {
                state.banner[bannerIndex] = { ...state.banner[bannerIndex], ...action.payload?.data };
              }
            }
            state.isLoading = false;
            Success("Banner Update Successfully")

          });
      
          builder.addCase(updateBanner.rejected, (state, action) => {
            
            state.isLoading = false;
          });


          builder.addCase(isActive.pending, (state, action) => {
            state.isLoading = true;
          })
      
          builder.addCase(isActive.fulfilled, (state, action) => {
            if (action.payload?.status) {
              const updatedBanner = action.payload?.data;
              const bannerIndex = state.banner.findIndex(banner => banner?._id === updatedBanner?._id);
              if (bannerIndex !== -1) {
                   
                state.banner[bannerIndex].isActive = updatedBanner.isActive;
              }
              Success("Banner Status Update Successfully")       
            }
            state.isLoading = false;

          })
          builder.addCase(isActive.rejected, (state, action) => {
               
            state.isLoading = false;
          })

          builder.addCase(deleteBanner.pending, (state, action) => {
            state.isLoading = true;
          })
          builder.addCase(deleteBanner.fulfilled, (state, action) => {
            if (action.payload.status) {
              state.banner = state.banner.filter((banner) => banner._id !== action.meta.arg);
              Success("Banner Delete Successfully")
            }
            state.isLoading = false;

          })
          builder.addCase(deleteBanner.rejected, (state, action) => {
            state.isLoading = false;
          })
      
    }
})
export default bannerSlice.reducer