import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsJson from '../../assets/markdown/index.json?raw'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const mockDelayTime = 2000;

export const fetchPosts = createAsyncThunk('blog/fetchData', async () => {
    let mockDelay = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(JSON.parse(postsJson));
            }, mockDelayTime)
        })
    }
    let data = await mockDelay();
    return data
})


const blogSlice = createSlice({
    name: 'blog',

    initialState,

    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'success';
                state.posts = action.payload || []
            })
    }
})

export default blogSlice.reducer; 

export const selectBlog = (state) => state.blog;

export const selectPostsInfo = (state) => state.blog.posts; // [{slug:'', fromtmatter:{"title":"","date":"","slug":"","description":"","cover_img":""}}]

export const selectBlogStatus = (state) => state.blog.status;

export const selectBlogError = (state) => state.blog.error;

export const selectPostInfo = (state, index) => index>=0 && index<state.posts