import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/postList";

export const fetchPost = createAsyncThunk("postList/fetch", async () => {
    const resp = await axios.get(BASE_URL);
    return resp.data;
});

export const updatePost = createAsyncThunk(
    "postList/update",
    async ({ id, updatedPost }, { rejectWithValue }) => {
        try {
            const resp = await axios.put(`${BASE_URL}/${id}`, updatedPost);
            return resp.data; // return updated post
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update post");
        }
    }
);

export const addPost = createAsyncThunk("postList/add", async (newPost, { rejectWithValue }) => {
    try {
        const resp = await axios.post(BASE_URL, newPost);
        return resp.data; // return created post to add it in the store
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add post");
    }
});

export const deletePost = createAsyncThunk("postList/delete", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete post");
    }
});

const postSlice = createSlice({
    name: "postList",
    initialState: {
        postList: [],
        originalData: [],
        loading: false,
        error: null,
    },
    reducers: {
        filterPost: (state, action) => {
            if (action.payload) {
                state.postList = state.originalData.filter(
                    (v) => v.category === action.payload
                );
            } else {
                state.postList = state.originalData;
            }
        },

        sortPost: (state, action) => {
            const sortType = action.payload;
            if (sortType === "title-asc") {
                state.postList = [...state.postList].sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            } else if (sortType === "title-desc") {
                state.postList = [...state.postList].sort((a, b) =>
                    b.title.localeCompare(a.title)
                );
            } else {
                state.postList = state.originalData;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.postList = action.payload;
                state.originalData = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.loading = false;
                const newPost = action.payload;
                state.postList.push(newPost);
                state.originalData.push(newPost);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add post";
            })

            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const id = action.payload;
                state.loading = false;
                state.postList = state.postList.filter((post) => post.id != id);
                state.originalData = state.originalData.filter((post) => post.id != id);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete post";
            })

            .addCase(updatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPost = action.payload;
                state.postList = state.postList.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                );
                state.originalData = state.originalData.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                );
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update post";
            });
    },
});

export const { filterPost, sortPost } = postSlice.actions;
export default postSlice.reducer;