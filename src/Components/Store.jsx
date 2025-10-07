import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from './Slice/postSlice'
import userSliceReducer from './Slice/usersSlice'


export const Store = configureStore({
    reducer: {
        postSlice: postSliceReducer,
        userSlice: userSliceReducer
    }
});