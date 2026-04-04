import axiosInstance from '@/axios/axiosInstance';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ENDPOINTS from '@/config/api.js';


interface roleState {
    roles: string[],
    loading: boolean,
    error: string,
    toast: {
        message: string | null;
        type: "success" | "error" | null;
    }
}


const initialState : roleState = {
    roles: [],
    loading: false,
    error: "",
    toast: {
        message: null,
        type: null,
    },
}

export const getAllRoles = createAsyncThunk(
    "role/getAllRoles",
    async (_, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get(ENDPOINTS.ENDPOINTS.roles.list());
            return response.data.roles;
        }catch(error){
            console.log(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

//Add Role
export const addRole = createAsyncThunk(
    "role/addRole",
    async (role: string, {rejectWithValue}) => { 
        try{
            const response = await axiosInstance.post(ENDPOINTS.ENDPOINTS.roles.create(), {role});
            return response.data;
            return true;
        }catch(error){
            console.log(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

//Edit Role
export const editRole = createAsyncThunk(
    "role/edit",
    async (values, {rejectWithValue}) =>{
        try{
            console.log("EDIT Role value ", values);
            const response = await axiosInstance.patch(`/edit-role/${values.roleId}`, values);
            return response;
        }catch(error){
            console.log("ERROR:",error);
        }
    }
)

//Delete Role
export const deleteRole = createAsyncThunk(
    "role/delete",
    async (roleId, {rejectWithValue}) =>{
        try{
            if(roleId !== "" || roleId !== null){
                const response = await axiosInstance.delete(`/delete-role/${roleId}`);
                return response;
            }
        }catch(error){
            return rejectWithValue({
                message: "Internal server error",
                statusCode: 500
            });
        }
    }
)


const roleReducer = createSlice({
    name: "roleReducer",
    initialState,
    reducers:{
        clearToast: (state) => {
            state.toast.message = null;
            state.toast.type = null;
        },
        resetRolesState: () => initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllRoles.pending,(state, action)=>{
            state.loading = true;
        })
        .addCase(getAllRoles.fulfilled, (state: roleState, action)=>{
            state.loading = false;
            state.roles = action.payload;
        })
        .addCase(getAllRoles.rejected,(state, action)=>{
            state.loading = false;
        })
        .addCase(addRole.pending, (state, action)=> {
            state.loader = true;
        })
        .addCase(addRole.fulfilled, (state, action:any)=> {
            state.loader = false;
            state.toast = {
            message: "Role created successfully",
            type: "success",
            };
        })
        .addCase(addRole.rejected, (state, action)=> {
            state.loader = false;
            state.toast = {
                message: "Failed to create role",
                type: "error",
            };
        })
        .addCase(deleteRole.pending, (state, action)=>{
            state.loading = true;
        })
         .addCase(deleteRole.fulfilled, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "Role deleted successfully",
                type: "success",
            };
            
        })
        .addCase(deleteRole.rejected, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "Failed to delete role",
                type: "error",
            };
        })
        .addCase(editRole.pending, (state, action)=>{
            state.loading = true;
        })
        .addCase(editRole.fulfilled, (state, action)=>{
            state.loading = false;
            state.toast = {
                message: "Role updated successfully",
                type: "success",
            };
        })
        .addCase(editRole.rejected, (state, action)=>{
            state.loading = false;
             state.toast = {
                message: "Failed to update role",
                type: "error",
            };
        })
    }
})

export const {clearToast, resetRolesState} = roleReducer.actions
export default roleReducer.reducer;