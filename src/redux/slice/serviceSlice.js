import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {
  service: [],
  subCat: [],
  isLoading: false,
  isSkeleton: false,
  total: null
}

export const getAllServices = createAsyncThunk("admin/service/getAll", async (payload) => {
  return apiInstanceFetch.get(`admin/service/getAll?start=${payload.start}&limit=${payload.limit}&search=${payload?.search}`)
});

export const addService = createAsyncThunk("admin/service", async (payload) => {
  return apiInstance.post("admin/service", payload)
});

export const updateService = createAsyncThunk("admin/service/update", async (payload) => {
  return apiInstance.patch(`admin/service/update/${payload.id}`, payload.formData)
});

export const getCatSubCat = createAsyncThunk("admin/subCategory/dropSubCategory", async (id) => {
  return apiInstanceFetch.get(`admin/subCategory/dropSubCategory/${id}`)
});

export const deleteService = createAsyncThunk("admin/service/delete", async (id) => {
  return apiInstance.patch(`admin/service/delete/${id}`)
});

export const serviceStatus = createAsyncThunk("admin/service/status", async (id) => {
  return apiInstance.put(`admin/service/status?serviceId=${id}`)
})

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCatSubCat.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(getCatSubCat.fulfilled, (state, action) => {
      state.subCat = action.payload.subcategories;
      state.isLoading = false;
    })

    builder.addCase(getCatSubCat.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getAllServices.pending, (state, action) => {
      state.isSkeleton = action.meta.arg.command;
      state.isSkeleton = true;
    })

    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.service = action.payload.services
      state.isSkeleton = false;
    })

    builder.addCase(getAllServices.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(addService.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addService.fulfilled, (state, action) => {
      if (action.payload.status) {
        const dataObject = {
          ...action.payload.service,
          categoryname: action.payload.service?.categoryId?.name
        }
        state.service.unshift(dataObject);
        Success("Service Add Successfully")
      }
      state.isLoading = false;
    });

    builder.addCase(addService.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateService.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateService.fulfilled, (state, action) => {
      if (action.payload.status) {
        const dataObject = {
          ...action.payload.service,
          categoryname: action.payload.service?.cat?.name
        }
        const serviceIdx = state.service.findIndex((service) => service?._id === dataObject?._id);
        if (serviceIdx !== -1) {
          state.service[serviceIdx] = { ...state.service[serviceIdx], ...dataObject };
        }
        Success("Service Update Successfully")
      }
      state.isLoading = false;
    });

    builder.addCase(updateService.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteService.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(deleteService.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.service = state.service.filter((service) => service._id !== action.meta.arg);
        Success("Service Delete Successfully")
      }
      state.isLoading = false;
    })

    builder.addCase(deleteService.rejected, (state, action) => {
      state.isLoading = false;
    })

  

    builder.addCase(serviceStatus.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedService = action.payload.service; 
        const serviceIndex = state.service.findIndex(service => service?._id === updatedService?._id);
        if (serviceIndex !== -1) {
          state.service[serviceIndex].status = updatedService.status;
        }
        Success("Updated Successfully")
      }
    })

 
  }
})
export default serviceSlice.reducer;