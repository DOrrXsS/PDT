import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUrlData } from '../../assets/data/webData';


const initialState = {
    urlsData: {},
    status: 'idle',
    error: null
};

const mockDelayTime = 2000;

//use thunk to create an async reducer, return a promise
//handled when the status goes througn idle|pending|fulfilled|rejected
export const fetchUrlData = createAsyncThunk('urls/fetchData', async ()=>{
    let mockDelay = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getUrlData());
            }, mockDelayTime)
        })
    }
    let data = await mockDelay();
    return data
})

const urlsSlice = createSlice({
    name: 'urls',

    initialState,

    reducers: {
        addurls: (state, action) => {
            state.urlsData[action.payload.urlType].unshift({title: action.payload.title, url: action.payload.url}) 
        },
        addurltype: (state, action) => {
            state.urlsData[action.payload.newUrlType]=[]
        },
        updateUrls: (state, action) => {
            if(action.payload["urlsData"]) {
                state.urlsData = action.payload.urlsData;
            }
        }
    },

    //use extraReducers to include reducers defined outside of createSlice
    extraReducers: builder => {
        //state is in slice's realm, action is returned in fetchUrlData funtion
        builder
        .addCase(fetchUrlData.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchUrlData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchUrlData.fulfilled, (state, action) => {
            state.status = 'success';
            Object.assign(state.urlsData, action.payload || {});
            
        })
    }
})


export default urlsSlice.reducer;

export const { addurls, updateUrls, addurltype } =  urlsSlice.actions;

export const selectUrls = state => state.urls;

export const selectUrlsData = state => state.urls.urlsData;

export const selectUrlsDataType = state => Object.keys(state.urls.urlsData);

export const selectUrlsStatus = state => state.urls.status;

export const selectUrlsError = state => state.urls.error;