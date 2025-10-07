import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

// Async thunk for login (save user)
export const loginUser = createAsyncThunk(
    "users/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        if (!email || !password) {
            return rejectWithValue("Please fill in all fields");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return rejectWithValue("Invalid email format");
        }

        const existing = await axios.get(`${BASE_URL}?email=${email}`);
        if (existing.data.length > 0) {
            return rejectWithValue("User already exists!");
        }

        const response = await axios.post(BASE_URL, { email, password });
        return response.data;

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
