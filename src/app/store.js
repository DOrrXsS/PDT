import { configureStore } from "@reduxjs/toolkit";
import urlsReducer from '../features/urlData/urlDataSlice';
import blogReducer from '../features/blog/blogSlice';


export default configureStore({
    reducer: {
        urls: urlsReducer,
        blog: blogReducer
    }
})
