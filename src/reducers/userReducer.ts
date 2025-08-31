import {createAsyncThunk, createSlice , PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  users: string[];
}


const initialState : UserState = {
    users: []
}


export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async () => {
        console.log("GetAllUsers called");
        // return "response";
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
            console.log("Data returned is", action);
        })
    }
});

export const {LOGOUT} = userReducer.actions;
export default userReducer.reducer;