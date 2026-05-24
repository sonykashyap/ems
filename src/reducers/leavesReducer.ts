import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type leaveType = {
    leaveType: string;
    totalDays: number;
    startDate: string;
    endDate: string;
    reasonForLeave: string;
    attachment: File | null;
}

interface leaveStateData {
    leaves: leaveType[];
    isLoading: boolean;
    toast: {
        message: string | null;
        type: "success" | "error" | null;
    }
}

const initialState:leaveStateData = {
    leaves: [],
    isLoading: false,
    toast: {
        message: null,
        type: null,
    },
}

export const applyLeave = createAsyncThunk(
    "leave/applyLeave",
    async(formData)=>{
        try{
            console.log("your data is ", formData);
            const response = await axiosInstance.post("/applyLeave", formData);
            return response;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error("Something went wrong");
        }
        
    }
);


const leaveReducer = createSlice({
    name: "leaveReducer",
    initialState,
    reducers:{
        clearToast: (state) => {
            state.toast.message = null;
            state.toast.type = null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(applyLeave.pending, (state, action)=>{
            console.log("Action is ", action.payload);
        })
        .addCase(applyLeave.fulfilled, (state, action)=>{
            console.log("Action is fullfilled ", action.payload);
            state.toast = {
                message: "Leave applied Successfully",
                type: "success"
            }
        })
        .addCase(applyLeave.rejected, (state, action)=>{
            console.log("Action is rejected", action.payload);
             state.toast = {
                message: "Leave applied failed. Please try again after sometime",
                type: "error"
            }
        })
    }

});

export const {clearToast} = leaveReducer.actions;
export default leaveReducer.reducer;