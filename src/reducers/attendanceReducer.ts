import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type attendanceStateData = {
    attendance: any[];
    punchInTime?: string | null;
    punchOutTime?: string | null;
    totalWorkingHours?: string | null;
    breakTime?: string | null;
    isOnBreak?: boolean;
    breakStartedAt?: string | null;
    isLoading: boolean;
    toast: {
        message: string | null;
        type: "success" | "error" | null;
    }
}

const initialState:attendanceStateData = {
    attendance: [],
    isLoading: false,
    toast: {
        message: null,
        type: null,
    },
    punchInTime: null,
    punchOutTime: null,
    totalWorkingHours: null,
    breakTime: null,
    isOnBreak: false,
    breakStartedAt: null,
}

export const attendance = createAsyncThunk(
    "attendance/getAttendance",
    async()=>{
        try{
            const response = await axiosInstance.get("/attendance");
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
    }
);  

export const punchIn = createAsyncThunk(
    "attendance/punchIn",
    async(userId: string)=>{
        try{
            const response = await axiosInstance.post(`/attendance/punch-in/${userId}`);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
    }
);

export const fetchTodayAttendance = createAsyncThunk(
    "attendance/fetchTodayAttendance",
    async(userId: string)=>{
        try{
            const response = await axiosInstance.get(`/attendance/${userId}`);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
    }
);

export const punchOut = createAsyncThunk(
    "attendance/punchOut",
    async(userId: string)=>{
        try{
            const response = await axiosInstance.post(`/attendance/punch-out/${userId}`);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
    }
);

export const startBreak = createAsyncThunk(
    "attendance/startBreak",
    async(userId: string)=>{
        try{
            const response = await axiosInstance.post(`/attendance/break-start/${userId}`);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
    }
);

export const endBreak = createAsyncThunk(
    "attendance/endBreak",
    async(userId: string)=>{
        try{
            const response = await axiosInstance.post(`/attendance/break-end/${userId}`);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
    }
);

const formatElapsedTime = (startTime: string | Date, endTime?: string | Date) => {
    const startTimestamp = new Date(startTime).getTime();
    const endTimestamp = endTime ? new Date(endTime).getTime() : Date.now();
    const totalSeconds = Math.max(0, Math.floor((endTimestamp - startTimestamp) / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

    return `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
};

const attendanceReducer = createSlice({
    name: "attendanceReducer",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(attendance.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(attendance.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.attendance = action.payload;
        })     
        .addCase(attendance.rejected, (state, action)=>{
            console.log("Action is rejected ", action.payload);
            state.toast = {
                message: "Failed to get attendance",
                type: "error"
            }
        })
        .addCase(punchIn.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(punchIn.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.punchInTime = action.payload?.attendance?.punch_in ?? null;
            state.punchOutTime = action.payload?.attendance?.punch_out ?? null;
            state.totalWorkingHours = null;
            state.breakTime = action.payload?.attendance?.break_time ?? "00:00:00";
            state.isOnBreak = Boolean(action.payload?.attendance?.is_on_break);
            state.breakStartedAt = action.payload?.attendance?.break_started_at ?? null;
            state.toast = {
                message: "Punched in successfully",
                type: "success"
            }
        })     
        .addCase(punchIn.rejected, (state, action)=>{
            console.log("Action is rejected ", action.payload);
            state.toast = {
                message: "Failed to punch in",
                type: "error"
            }
        })
        .addCase(fetchTodayAttendance.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.punchInTime = action.payload?.attendance?.punch_in ?? null;
            state.punchOutTime = action.payload?.attendance?.punch_out ?? null;
            state.totalWorkingHours = action.payload?.attendance?.punch_in
                ? formatElapsedTime(action.payload.attendance.punch_in, action.payload?.attendance?.punch_out ?? undefined)
                : null;
            state.breakTime = action.payload?.attendance?.break_time ?? "00:00:00";
            state.isOnBreak = Boolean(action.payload?.attendance?.is_on_break);
            state.breakStartedAt = action.payload?.attendance?.break_started_at ?? null;
        })
        .addCase(punchOut.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.punchInTime = action.payload?.attendance?.punch_in ?? null;
            state.punchOutTime = action.payload?.attendance?.punch_out ?? null;
            state.totalWorkingHours = action.payload?.attendance?.punch_in && action.payload?.attendance?.punch_out
                ? formatElapsedTime(action.payload.attendance.punch_in, action.payload.attendance.punch_out)
                : null;
            state.breakTime = action.payload?.attendance?.break_time ?? "00:00:00";
            state.isOnBreak = false;
            state.breakStartedAt = null;
            state.toast = {
                message: "Punched out successfully",
                type: "success"
            }
        })
        .addCase(punchOut.rejected, (state, action)=>{
            console.log("Action is rejected ", action.payload);
            state.toast = {
                message: "Failed to punch out",
                type: "error"
            }
        })
        .addCase(startBreak.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.breakTime = action.payload?.attendance?.break_time ?? state.breakTime ?? "00:00:00";
            state.isOnBreak = Boolean(action.payload?.attendance?.is_on_break);
            state.breakStartedAt = action.payload?.attendance?.break_started_at ?? null;
            state.toast = {
                message: "Break started successfully",
                type: "success"
            }
        })
        .addCase(endBreak.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.breakTime = action.payload?.attendance?.break_time ?? state.breakTime ?? "00:00:00";
            state.isOnBreak = false;
            state.breakStartedAt = null;
            state.toast = {
                message: "Break ended successfully",
                type: "success"
            }
        })
    }
});

export default attendanceReducer.reducer;