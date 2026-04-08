import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface EventItem {
  title: string;
  description: string;
  image: string;
  eventDate: string;
}

interface EventStateData {
    events: EventItem[];
    loading: boolean;
    toast: {
        message: string | null;
        type: "success" | "error" | null;
    }
}


const initialState: EventStateData = {
    events: [],
    loading: false,
    toast: {
        message: null,
        type: null,
    },
}
//Get all Events
export const listEvents = createAsyncThunk(
    "event/list",
    async () => {
        try{
            const response = await axiosInstance.get("/events");
            return response.data;
        }catch(error){
            throw new Error("Something went wrong!");
        }
    }
)


export const addEvent = createAsyncThunk(
    "event/add",
    async (payload) => {
        try{
            console.log("payload for event data is ", payload);
            const response = await axiosInstance.post("/event", payload);
            return response.data;
        }catch(error){
            throw new Error("Something went wrong!");
        }
    }
)

const eventReducer = createSlice({
    name: "eventReducer",
    initialState,
    reducers:{
        clearToast: (state) => {
            state.toast.message = null;
            state.toast.type = null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addEvent.pending, (state, action)=>{
            console.log("Pending event post state");
        })
        .addCase(addEvent.fulfilled, (state, action)=>{
            console.log("Pending event post state");
            state.loading = false;
            state.toast = {
                message: "Event created Successfully",
                type: "success"
            }
        })
        .addCase(addEvent.rejected, (state, action)=>{
            console.log("Pending event post state");
            state.loading = false;
            state.toast = {
                message: "Failed to create Event",
                type: "error"
            }
        })
        .addCase(listEvents.fulfilled, (state, action)=>{
            state.events = action.payload.data;
            state.loading = false;
        })
        .addCase(listEvents.rejected, (state, action)=>{
            state.loading = false;
        })
    }
})

export const {clearToast} = eventReducer.actions
export default eventReducer.reducer;
