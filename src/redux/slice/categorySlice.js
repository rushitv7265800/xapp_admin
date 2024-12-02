import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { DangerRight, Success } from "../../component/api/toastServices";

const initialState = {
  content: [],
  isLoading: false,
  isSkeleton: false,
  total: null
}

export const getAllContent = createAsyncThunk("content/get", async () => {
  return apiInstanceFetch.get("content/get");
})

export const contentAdd = createAsyncThunk("content/create", async (payload) => {
  return apiInstance.post("content/create", payload);
})

export const contentUpdate = createAsyncThunk("content/update", async (payload) => {

  return apiInstance.patch(`content/update?contentId=${payload?.contentId}`, payload?.data);
})

export const deleteContent = createAsyncThunk("content/delete", async (id) => {

  return apiInstance.delete(`content/delete?contentId=${id}`)
})

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getAllContent.pending, (state, action) => {
      state.isSkeleton = true;
    })

    builder.addCase(getAllContent.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.content = action.payload.data;
      state.isSkeleton = false;
    })

    builder.addCase(getAllContent.rejected, (state, action) => {
      state.isSkeleton = false;
    })

    builder.addCase(contentAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(contentAdd.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.content.unshift(action.payload.data);
        Success("Content Add Successfully")
      }
      state.isLoading = false;
    });

    builder.addCase(contentAdd.rejected, (state, action) => {

      state.isLoading = false;
    });


    builder.addCase(contentUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(contentUpdate.fulfilled, (state, action) => {

      if (action.payload?.status) {
        const contentIndex = state.content.findIndex((content) => content?._id === action.payload?.data?._id);
        if (contentIndex !== -1) {
          state.content[contentIndex] = { ...state.content[contentIndex], ...action.payload?.data };
        }
      }
      state.isLoading = false;
      Success("Content Update Successfully")

    });

    builder.addCase(contentUpdate.rejected, (state, action) => {

      state.isLoading = false;
    });

    builder.addCase(deleteContent.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.content = state.content.filter((content) => content?._id !== action.meta.arg);
        Success("Content Delete Successfully")
      }
      state.isLoading = false;

    })
    builder.addCase(deleteContent.rejected, (state, action) => {
      state.isLoading = false;
    })

  }
})
export default categorySlice.reducer