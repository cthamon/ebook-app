import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/authSlice';
import cart from './slices/cartSlice';

const store = configureStore({
    reducer: {
        auth,
        cart
    }
});

export default store;