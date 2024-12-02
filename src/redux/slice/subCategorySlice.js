import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {

    subCategory: [],
    isLoading: false,
    isSkeleton: false,

}


export const getAllSubCategory = createAsyncThunk("admin/subcategory/getAll", async () =>{
    return apiInstanceFetch.get("admin/subcategory/getAll")
})

export const addSubCategory = createAsyncThunk("admin/subcategory", async (payload) =>{
    return apiInstance.post("admin/subcategory",payload)
})

export const updateSubCategory = createAsyncThunk("admin/subcategory/update", async (payload) =>{
    return apiInstance.patch(`admin/subcategory/update/${payload.id}`,payload.formData)
})

export const subCategoryStatus = createAsyncThunk("admin/subcategory/status", async (id) =>{
  
  return apiInstance.put(`admin/subcategory/status?subcategoryId=${id}`)
})

export const deleteSubCategory = createAsyncThunk("admin/subCategory/delete", async (id) =>{
    return apiInstance.delete(`admin/subCategory/delete/${id}`,)
})


const subCategorySlice = createSlice({
    name : "subCategorySlice",
    initialState,
    reducers: {},

    extraReducers:(builder) =>{
        // getSubcategory
        builder.addCase(getAllSubCategory.pending,(state,action)=>{
            state.isSkeleton = true;
        });

        builder.addCase(getAllSubCategory.fulfilled,(state,action)=>{
            state.isSkeleton = false;
            state.subCategory = action.payload.subcategories;
        });

        builder.addCase(getAllSubCategory.rejected,(state,action)=>{
            state.isSkeleton = false;
        });

        // addSubCategory

        builder.addCase(addSubCategory.pending, (state, action) => {
            state.isLoading = true;
          });
      
          builder.addCase(addSubCategory.fulfilled, (state, action) => {
            
            state.subCategory.unshift(action.payload.subcategory);
            state.isLoading = false;
            Success("Subcategory Create Successfully")
          });
      
          builder.addCase(addSubCategory.rejected, (state, action) => {
      
            state.isLoading = false;
          });

          builder.addCase(updateSubCategory.pending, (state, action) => {
            state.isLoading = true;
          });
      
          builder.addCase(updateSubCategory.fulfilled, (state, action) => {
            if (action.payload.status) {
              const subCategoryIdx = state.subCategory.findIndex((sub) => sub?._id === action.payload.subcategory?._id);
              if (subCategoryIdx !== -1) {
                
                state.subCategory[subCategoryIdx] = { ...state.subCategory[subCategoryIdx], ...action.payload?.subcategory };
              }
              Success("Subcategory Update Successfully")
            }
            state.isLoading = false;
          });
      
          builder.addCase(updateSubCategory.rejected, (state, action) => {
            state.isLoading = false;
          });

          builder.addCase(deleteSubCategory.pending, (state, action) => {
            state.isLoading = true;
          })
          builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            if (action.payload.status) {
              state.subCategory = state.subCategory.filter((subCategory) => subCategory._id !== action.meta.arg);
              Success("Subcategory Deleted Successfully")
            }
            state.isLoading = false;

          })
          builder.addCase(deleteSubCategory.rejected, (state, action) => {
            state.isLoading = false;
          })

          builder.addCase(subCategoryStatus.pending, (state, action) => {
            state.isLoading = true;
          })
      
          builder.addCase(subCategoryStatus.fulfilled, (state, action) => {
            if (action.payload.status) {
              const updatedSubCategory = action.payload.subcategory; 
              const subcategoryIndex = state.subCategory.findIndex(subcategory => subcategory?._id === updatedSubCategory?._id);
              if (subcategoryIndex !== -1) {
                   
                state.subCategory[subcategoryIndex].status = updatedSubCategory.status;
              }
              Success("Subcategory Status Update Successfully")
            }
            state.isLoading = false;

          })
          builder.addCase(subCategoryStatus.rejected, (state, action) => {
             
            state.isLoading = false;
          })
    }
})
export default subCategorySlice.reducer;