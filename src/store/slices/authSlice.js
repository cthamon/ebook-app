import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
        },
    },
});

export const { signOut, setUser } = authSlice.actions;

export default authSlice.reducer;