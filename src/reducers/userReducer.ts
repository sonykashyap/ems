import axiosInstance from '@/axios/axiosInstance';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from '@/config/api.js';


interface UsersData {
  id: string;
  name: string;
  email: string;
  // add other fields
}

interface UserState {
  users: UsersData[],
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
}

//Get all users
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_,{rejectWithValue}) => {
        try{
            const users = await axiosInstance.get(ENDPOINTS.ENDPOINTS.users.list());
            return users.data.data;
        }catch(error){
            if(error.response.data.message === "Token expired"){
                return rejectWithValue({
                    message: error.response.data.message,
                    code: error.response.data.code,
                    status: error.response.status
                });
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
            console.log("Values to edit is ", values);
            const response = await axiosInstance.patch(ENDPOINTS.ENDPOINTS.users.edit(values.userId), values);
            return response;
        }catch(error){
            console.log(error);
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
            console.log("Payload is ", payload);
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

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        LOGOUT(state, action){
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
        clearToast: (state) => {
            state.toast.message = null;
            state.toast.type = null;
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
            state.users = action.payload;
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
    }
});

export const {LOGOUT, clearToast, resetUserState} = userReducer.actions;
export default userReducer.reducer;