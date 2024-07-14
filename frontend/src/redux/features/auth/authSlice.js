import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredential: (state, action)=>{
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            state.userInfo = action.payload;

            const expirationTime = new Date().getTime() + 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
        },
        logout: (state)=>{
            localStorage.removeItem("userInfo");
            state.userInfo = null;
        }
    }
})

export const { setCredential, logout } = authSlice.actions;

export default authSlice.reducer;