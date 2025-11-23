import axiosInstance from '@/axios/axiosInstance';
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  users: string[],
  loading: boolean,
  isAuthenticated: boolean,
  isCreated: boolean,
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
    isCreated : false
}

//Get all users
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_,{rejectWithValue}) => {
        try{
            const users = await axiosInstance.get("/users");
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
            console.log("Data is ", values);
            const jsonData = JSON.stringify(values);
            const bytes = new Blob([jsonData]).size;
            console.log("Data is ", values);
            console.log("Data in KB is  ", (bytes/1024).toFixed(2));
            const response = await axiosInstance.post("/add-user", jsonData);
            console.log("Response from added new user is ", response);
            dispatch(getAllUsers());
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
            const response = await axiosInstance.patch(`/edit-user/${values.userId}`, values);
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
            const response = await axiosInstance.delete(`/user/${userId}`);
            return response;
        }catch(error){
            console.log("error while deleting user is ", error);
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
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.fulfilled, (state, action: ReturnType<typeof getAllUsers.fulfilled>)=>{
            console.log("All users are ", action.payload);
            state.users = action.payload;
        })
        .addCase(getAllUsers.rejected, (state, action: ReturnType<typeof getAllUsers.rejected>)=>{
            state.error = action.payload;
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
        })
        .addCase(deleteUserById.rejected, (state, action)=>{
            state.loading = false;
        })
        .addCase(addUser.pending, (state, action)=>{
            console.log("Pending state");
            state.loading = true;
        })
        .addCase(addUser.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addUser.rejected, (state, action)=>{
            console.log("Rejected state");
            state.loading = false;
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
    }
});

export const {LOGOUT} = userReducer.actions;
export default userReducer.reducer;