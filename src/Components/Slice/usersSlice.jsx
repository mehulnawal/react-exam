import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            if (!email || !password) {
                return rejectWithValue("Please fill in all fields");
            }

            const newUser = { email, password };
            const response = await axios.post(BASE_URL, newUser);

            return response.data;
        } catch (err) {
            return rejectWithValue("Failed to save user data");
        }
    }
);

const usersSlice = createSlice({
    name: "usersSlice",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: null,
    },
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = "Login info saved successfully!";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = usersSlice.actions;
export default usersSlice.reducer;