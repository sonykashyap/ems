import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const initialState = {
    token: ""
}

export const login = createAsyncThunk(
    "login",
    ()=>{
        console.log("Login access token is ");
    }
)



const loginReducer = createSlice({
    name: "loginReducer",
    initialState,
    reducers:{
        accessToken: (state, payload) =>{
            console.log("Token is ", payload.payload);
        }
    },
    extraReducers:(builder)=>{}
})

export const {accessToken} = loginReducer.actions
export default loginReducer.reducer;