import axiosInstance from '@/axios/axiosInstance';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface roleState {
    roles: string[]
}


const initialState : roleState = {
    roles: [],

}

export const getAllRoles = createAsyncThunk(
    "role/getAllRoles",
    async () => {
        console.log("Reducer callled");
        const response = await axiosInstance.get('/roles');
        return response;
    }
)

export const addRole = createAsyncThunk(
    "role/addRole",
    async () => { 
        
    }
)


const roleReducer = createSlice({
    name: "roleReducer",
    initialState,
    reducer:{},
    extraReducer:(builder)=>{
        builder
        .addCase(getAllRoles.pending,(state, action)=>{
            console.log("Pending State")
        })
        .addCase(getAllRoles.fulfilled,(state: roleState, action)=>{
            console.log("Fulfilled State")
            console.log("Response is ", action.payload);
        })
        .addCase(getAllRoles.rejected,(state, action)=>{
            console.log("Rejected State")
        })
        .addCase(addRole.pending, (state, action)=> {
            console.log("Pendindg state ");
        })
        .addCase(addRole.fulfilled, (state, action)=> {
            console.log("Fulflled state ");
        })
        .addCase(addRole.rejected, (state, action)=> {
            console.log("Rejected state ");
        })
    }
})

export const {} = roleReducer.actions
export default roleReducer.reducer;