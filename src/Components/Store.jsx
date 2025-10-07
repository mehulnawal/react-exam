import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from './Slice/postSlice'

export const Store = configureStore({
    reducer: {
        postSlice: postSliceReducer
    }
});