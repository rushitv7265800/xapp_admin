import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch, apiInstanceFetch2 } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {
  setting: {},
  adminCoin: {},
  isLoading: false,
  isSkeleton: false,
};

export const getSetting = createAsyncThunk(
  "setting/get",
  async (payload) => {
    return apiInstanceFetch2.get("setting/get");
  }
);

export const getAdminCoin = createAsyncThunk(
  "aviatorAdminCoin/get",
  async (payload) => {
    return apiInstanceFetch2.get("aviatorAdminCoin/get");
  }
);

export const updateAdminCoin = createAsyncThunk(
  "aviatorAdminCoin/update",
  async (payload) => {
    return apiInstanceFetch2.patch(
      `aviatorAdminCoin/update?adminCoinId=${payload.id}`,
      payload.data
    );
  }
);

export const updateSetting = createAsyncThunk(
  "setting/update",
  async (payload) => {
    return apiInstanceFetch2.patch(
      `setting/update?id=${payload.id}`,
      payload.data
    );
  }
);

export const maintenanceMode = createAsyncThunk(
  "admin/setting/appActive",
  async (id) => {
    return apiInstance.put(`admin/setting/appActive?id=${id}`);
  }
);

export const handleSetting = createAsyncThunk(
  "admin/setting/settingSwitch",
  async (payload) => {
    return apiInstance.put(
      `admin/setting/settingSwitch?id=${payload?.id}&type=${payload?.type}`,
      payload.data
    );
  }
);

export const deleteReview = createAsyncThunk(
  "admin/review/delete",
  async (id) => {
    return apiInstance.delete(`admin/review/delete/${id}`);
  }
);

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSetting.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.setting = action.payload.data;
    });

    builder.addCase(getSetting.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getAdminCoin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAdminCoin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminCoin = action.payload.data;
    });

    builder.addCase(getAdminCoin.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateAdminCoin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateAdminCoin.fulfilled, (state, action) => {
      if (action.payload?.status) {
        state.adminCoin = { ...state.adminCoin, ...action.payload?.data };
        Success("Admin Coin Updated Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(updateAdminCoin.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateSetting.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateSetting.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.setting = { ...state.setting, ...action.payload.data };
        Success("Setting Updated Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(updateSetting.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(maintenanceMode.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.setting = { ...state.setting, ...action.payload.setting };
        Success("Maintenance Mode Updated Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(deleteReview.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteReview.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.setting = state.setting.filter(
          (setting) => setting._id !== action.meta.arg
        );
      }
      state.isLoading = false;
    });

    builder.addCase(deleteReview.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(handleSetting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.setting = action.payload.setting;
      Success("Updated Successfully");
    });
    builder.addCase(handleSetting.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default settingSlice.reducer;
