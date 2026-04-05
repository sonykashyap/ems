import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from '@/config/api.js';

interface dashboardData {
    totalUsers: number;
    totalRoles: number;
    loading: boolean;
}

const initialState: dashboardData = {
    totalUsers : 0,
    totalRoles: 0,
    loading: false
}

export const dashboardData = createAsyncThunk(
    "dashboard/dashboardData",
    async () => {
        console.log("Dashboard Async thiunk called");
        const response = await axiosInstance.get(ENDPOINTS.ENDPOINTS.dashboard.dashboardData());
        return response.data;
    }
)

const dashboardReducer = createSlice({
    name: "dahboardReducer",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(dashboardData.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(dashboardData.fulfilled, (state, action)=>{
            state.loading = true
            console.log("Payload is ", action.payload);
            state.totalUsers = action.payload.data.totalUsers;
            state.totalRoles = action.payload.data.totalRoles;
        })
        .addCase(dashboardData.rejected, (state, action)=>{
            state.loading = false;
        })
    }
})
export const {} = dashboardReducer.actions

export default dashboardReducer.reducer;