import axiosInstance from '@/axios/axiosInstance';
import reducers from '@/reducers';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface roleState {
    roles: string[],
    loader: boolean,
    error: string,
    toast: {
        message: string | null;
        type: "success" | "error" | null;
    }
}


const initialState : roleState = {
    roles: [],
    loader: false,
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
            const response = await axiosInstance.get('/roles');
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
            // const response = await axiosInstance.post('/roles', {role});
            // return response.data;
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
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllRoles.pending,(state, action)=>{
            console.log("getAllRoles Pending State")
        })
        .addCase(getAllRoles.fulfilled, (state: roleState, action)=>{
            state.roles = action.payload;
        })
        .addCase(getAllRoles.rejected,(state, action)=>{
            console.log("getAllRoles Rejected State")
        })
        .addCase(addRole.pending, (state, action)=> {
            console.log("addRole Pendindg state ");
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
            console.log("deleteRole::Pending");
        })
         .addCase(deleteRole.fulfilled, (state, action)=>{
            console.log("deleteRole::fulfilled");
        })
        .addCase(deleteRole.rejected, (state, action)=>{
            console.log("deleteRole::Rejected", action);
        })
        .addCase(editRole.pending, (state, action)=>{
            console.log("editRole::Pending");
        })
        .addCase(editRole.fulfilled, (state, action)=>{
            state.toast = {
                message: "Role updated successfully",
                type: "success",
            };
        })
        .addCase(editRole.rejected, (state, action)=>{
             state.toast = {
                message: "Failed to update role",
                type: "error",
            };
        })
    }
})

export const {clearToast} = roleReducer.actions
export default roleReducer.reducer;