import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const foundItem = state.find(
                (item) => item.id === action.payload.id
            );

            if (!foundItem) state.push(action.payload);
        },
        deleteCart: (state, action) =>
            state.filter((item) => item.id !== action.payload),
        clearCart: (state) =>
            state = [],
    },
});

export const { addToCart, deleteCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;