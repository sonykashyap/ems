import axiosInstance from '@/axios/axiosInstance';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from '@/config/api.js';


type roleIdType = {
    createdAt: string;
    description: string;
    name: string;
    updatedAt: string;
    _id: string;
}

interface UsersData {
  id: string;
  name: string;
  email: string;
  roleId: roleIdType[]
}

interface UserState {
  users: [],
  loading: boolean,
  isAuthenticated: boolean,
  isCreated: boolean,
    toast: {
        message: string | null;
        type: "success" | "error" | null;
    }
    error: {
        message: string;
        code?: string;
        status?: number;
    } | null;
    userProfile: string;
    userProfileData: UsersData | null;
    page: number;
    totalPages: number;
    limit: number;
    total: number;
    sort: string;
    order: string;
    search: string;

}

const initialState : UserState = {
    users: [],
    loading: false,
    error: null,
    isAuthenticated: false,
    isCreated : false,
    toast: {
        message: null,
        type: null,
    },
    userProfile: "",
    userProfileData: null,
    page: 1,
    totalPages: 0,
    limit: 5,
    total: 0,
    sort: "createdAt",
    order: "desc",
    search: ""
    
}

//Get all users
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (page:number,{rejectWithValue}) => {
        try{
            const users = await axiosInstance.get(ENDPOINTS.ENDPOINTS.users.list(page));
            return users.data;
        }catch(error){
            if(error instanceof Error){
                if(error?.response.data.message === "Token expired"){
                return rejectWithValue({
                    message: error.response.data.message,
                    code: error.response.data.code,
                    status: error.response.status
                });
            }
            }
            
        }
    }
)


//Add a user
export const addUser = createAsyncThunk(
    "users/addUser",
    async (values, { rejectWithValues, dispatch}) =>{
        try{
            const jsonData = JSON.stringify(values);
            // const bytes = new Blob([jsonData]).size;
            // console.log("Data in KB is  ", (bytes/1024).toFixed(2));
            const response = await axiosInstance.post(ENDPOINTS.ENDPOINTS.users.create(), jsonData);
            // dispatch(getAllUsers());
            return response;
        }catch(error){
            console.log("error:", error);
        }
        
    }
)


export const editUser = createAsyncThunk(
    "user/edit",
    async (values, {rejectWithValues}) =>{
        try{
            const response = await axiosInstance.patch(ENDPOINTS.ENDPOINTS.users.edit(values.userId), values);
            return response;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message);
            }else{
                throw new Error("Something went wrong");
            }
            
        }
    }
)


//Delete a user by Id
export const deleteUserById = createAsyncThunk(
    "user/deleteUserByid",
    async (userId : string)=>{
        try{
            console.log("Id to delete is ", userId);
            const response = await axiosInstance.delete(ENDPOINTS.ENDPOINTS.users.delete(userId));
            return response;
        }catch(error){
            console.log("error while deleting user is ", error);
        }
    }
)

// Forgot password
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (payload) => {
        try{
            const result = await axiosInstance.post(ENDPOINTS.ENDPOINTS.users.forgotPassword(), payload);
            return result;
        }catch(error){
            console.log("error: ", error);
        }
    }
);

// Reset password
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async () => {
        try{
            const result = await axiosInstance.post(ENDPOINTS.ENDPOINTS.users.resetPassword())
            console.log("Result is ", result);
        }catch(error){
            console.log("error: ", error);
        }
    }
)

export const getProfile = createAsyncThunk(
    'user/profile',
    async()=>{
        try{
            const user = JSON.parse(localStorage.getItem("userData") ?? "");
            console.log("userId is ", user.id);
            const response = await axiosInstance.get(`/profile/${user.id}`);
            return response.data.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message);
            }else{
                throw new Error("Something went wrong");
            }
            
        }
    }
)

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async(payload)=>{
        try{
            const user = JSON.parse(localStorage.getItem("userData") ?? "");
            const response = await axiosInstance.patch(`/update-profile/${user.id}`, payload);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message);
            }else{
                throw new Error("Something went wrong");
            }
            
        }
    }
);

export const updateProfilePic = createAsyncThunk(
    "user/updateProfilePic",
    async(formData)=>{
        try{
            const user = JSON.parse(localStorage.getItem("userData") ?? "");
            const response = await axiosInstance.patch(`/update-profile-pic/${user.id}`, formData);
            console.log("REAPONSA::", response);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message);
            }
            throw new Error("Something went wrong");
        }
    }
)

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        LOGOUT(){
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
        clearToast: (state) => {
            state.toast.message = null;
            state.toast.type = null;
        },
        getUserProfilePic: (state) => {
            const userData = JSON.parse(localStorage.getItem("userProfilePic") ?? "");
            state.userProfile = userData.userProfile;
        },
        setPage: (state,action)=>{
            console.log("Page is ",action.payload);
            state.page = action.payload;
        },
        resetUserState: () => initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.pending, (state, action: ReturnType<typeof getAllUsers.pending>)=>{
            state.loading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, action: ReturnType<typeof getAllUsers.fulfilled>)=>{
            state.loading = false;
            state.users = action.payload.data;
            // state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
        })
        .addCase(getAllUsers.rejected, (state, action: ReturnType<typeof getAllUsers.rejected>)=>{
            state.loading = false;
            state.error = {
                message: action.error.message || "Something went wrong",
            };
            if(action.payload?.code == "TOKEN_EXPIRED"){
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }
        })
         .addCase(deleteUserById.pending, (state, action)=>{
            state.loading = true;
        })
        .addCase(deleteUserById.fulfilled, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "User Deleted Successfully",
                type: "success"
            }
        })
        .addCase(deleteUserById.rejected, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "Failed delete user",
                type: "error"
            }
        })
        .addCase(addUser.pending, (state, action)=>{
            console.log("Pending state");
            state.loading = true;
        })
        .addCase(addUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "User Created Successfully",
                type: "success"
            }
        })
        .addCase(addUser.rejected, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "Failed to create new user",
                type: "error"
            }
        })
        .addCase(editUser.pending, (state,action)=>{
            console.log("Pending state");
        })
         .addCase(editUser.fulfilled, (state,action)=>{
            console.log("Fulfilled state");
        })
         .addCase(editUser.rejected, (state,action)=>{
            console.log("Rejected state");
        })
        .addCase(forgotPassword.fulfilled, (state,action)=>{
            state.toast = {
                message: "Email sent successfully. Please check your email",
                type: "success"
            }
        })
        .addCase(forgotPassword.rejected, (state,action)=>{
            state.toast = {
                message: "Something went wrong. Please try after some time",
                type: "success"
            }
        })
        .addCase(getProfile.fulfilled, (state, action)=>{
            state.userProfileData = action.payload;
        })
        .addCase(getProfile.rejected, (state, action)=>{
            state.toast = {
                message : "Could not fetch user profile data.",
                type: "error"
            }
        })
        .addCase(updateProfile.pending, (state , action)=>{
            state.loading = true;
        })
        .addCase(updateProfile.fulfilled, (state , action)=>{
            state.loading = false;
            state.toast = {
                message: "User updated successfully",
                type: "success"
            }
        })
        .addCase(updateProfile.rejected, (state , action)=>{
            state.loading = false;
            state.toast = {
                message: "Failed to update user information",
                type: "error"
            }
        })
        .addCase(updateProfilePic.fulfilled, (state,action)=>{
            localStorage.setItem("userProfilePic", action.payload.data.user_profile_pic);
            state.toast = {
                message: "Profile pic updated successfully",
                type: "success"
            }
        })
        .addCase(updateProfilePic.rejected, (state,action)=>{
            console.log("update Profile pic is ", action.payload);
            state.toast = {
                message: "Failed to update profile pic",
                type: "error"
            }
        })
    }
});

export const {LOGOUT, clearToast, resetUserState, getUserProfilePic, setPage} = userReducer.actions;
export default userReducer.reducer;